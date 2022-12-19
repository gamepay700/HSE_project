import sqlite3
from flask import Flask, request, jsonify, g, render_template
import re
import smtplib
from email.mime.text import MIMEText
from email.header import Header

app = Flask(__name__)
DATABASE = 'db.db'


def get_db():
    """Возвращает объект соединения с БД"""
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


def query_db(query, args=(), one=False):
    """Получает курсор, выполняет запрос и получает результ"""
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


@app.teardown_appcontext
def close_connection(exception):
    """Закрывает соединение с БД"""
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def checkEmail(email):
    """Проверяет на существование переданного email"""
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return False
    return True


def sendEmail(email_to, message):
    """Отправляет сообщение на указанный email"""

    email_from = 'nagordon@edu.hse.ru'
    password = 'yqbgwyymeszgnvgn'

    server = smtplib.SMTP('smtp.yandex.ru', 587)
    server.ehlo()
    server.starttls()
    server.login(email_from, password)

    subject = 'Информация о заказе'

    msg = MIMEText(message, 'plain', 'utf-8')
    msg['Subject'] = Header(subject, 'utf-8')
    msg['From'] = email_from
    msg['To'] = email_to

    server.sendmail(email_from, email_to, msg.as_string())
    server.quit()


@app.route('/')
def main():
    max_min = query_db(f'SELECT MIN("cost"), MAX("cost") FROM tovars')
    min_cost = max_min[0][0]
    max_cost = max_min[0][1]

    min_cost = f"val_min = {min_cost}"
    max_cost = f"val_max = {max_cost}"

    return render_template('main.html', min_cost=min_cost, max_cost=max_cost)


@app.route('/contacts')
def contacts():
    return render_template('contacts.html')


@app.route('/tovars/load', methods=['GET', 'POST'])
def tovars_load():
    input_json = request.form
    start = input_json['start']
    min_cost = input_json['min_cost']
    max_cost = input_json['max_cost']

    tovars = query_db(
        f'SELECT * FROM tovars WHERE cost >= {min_cost} AND cost <= {max_cost} ORDER BY quantity_buy desc LIMIT {start}, 18')
    all_tovars = query_db(
        f'SELECT * FROM tovars WHERE cost >= {min_cost} AND cost <= {max_cost}')

    dictToReturn = {'tovars': tovars, 'all_tovars': all_tovars}
    return jsonify(dictToReturn)


@app.route('/tovars/buy_open', methods=['GET', 'POST'])
def tovars_buy_open():
    input_json = request.form
    id = input_json['id']
    tovar = query_db(f'SELECT COUNT(*) FROM tovar_data WHERE tovar_id = {id} AND status = 0')[0]
    count_tovar = tovar[0]
    if count_tovar < 1:
        dictToReturn = {'error': 1, 'message': 'К сожалению товара нет в наличии. Зайдите позже.'}
        return jsonify(dictToReturn)
    return 'True'


@app.route('/tovars/buy', methods=['GET', 'POST'])
def tovars_buy():
    input_json = request.form
    id = input_json['id']
    email = input_json['email']
    if not checkEmail(email):
        dictToReturn = {'error': 1, 'message': 'Проверьте правильность введенного email.'}
        return jsonify(dictToReturn)

    tovar_count = query_db(f'SELECT COUNT(*) FROM tovar_data WHERE tovar_id = {id} AND status = 0')[0]
    count_tovar = tovar_count[0]
    if count_tovar < 1:
        dictToReturn = {'error': 1, 'message': 'К сожалению товара нет в наличии. Зайдите позже.'}
        return jsonify(dictToReturn)

    tovar = query_db(f'SELECT * FROM tovars WHERE id = {id}')[0]
    tovar_data = query_db(f'SELECT * FROM tovar_data WHERE tovar_id = {id} AND status = 0')[0]

    tovar_data_id = tovar_data[0]
    tovar_data_info = tovar_data[2]

    message = f'Спасибо за заказ. \nИнформация о заказе: {tovar_data_info}'
    sendEmail(email, message)

    query_update = f"UPDATE tovar_data SET status=1 WHERE id={tovar_data_id}"
    query_insert = f"INSERT INTO orders (email, data) VALUES ('{email}', '{tovar_data_info}');"

    con = get_db()
    with con:
        cur = con.cursor()
        cur.execute(query_update)
        cur.execute(query_insert)

    dictToReturn = {'error': 0, 'message': 'Спасибо за заказ. На указанный email придет информация о заказе.'}
    return jsonify(dictToReturn)


@app.route('/tovars/my_buys', methods=['GET', 'POST'])
def tovars_my_buys():
    input_json = request.form
    email = input_json['email']

    if not checkEmail(email):
        dictToReturn = {'error': 1, 'message': 'Проверьте правильность введенного email.'}
        return jsonify(dictToReturn)

    all_tovars = query_db(
        f'SELECT * FROM orders WHERE email = "{email}"')

    if len(all_tovars) == 0:
        dictToReturn = {'error': 1, 'message': 'Нет заказов у этого email.'}
        return jsonify(dictToReturn)
    message = ''
    for i in all_tovars:
        message += f'Информация о заказе №{i[0]}: {i[2]}'
    sendEmail(email, message)
    dictToReturn = {'error': 0, 'message': 'Информация о ваших заказах направлена на email.'}
    return jsonify(dictToReturn)


@app.route('/categories/load', methods=['GET', 'POST'])
def categories_load():
    categories = query_db('SELECT * FROM categories')

    dictToReturn = {'categories': categories}
    return jsonify(dictToReturn)


if __name__ == '__main__':
    app.run()
