import unittest
import main


class TestCase(unittest.TestCase):
    def test_checkEmail(self):
        self.assertEqual(main.checkEmail('kkhh'), False)
        self.assertEqual(main.checkEmail('kkhh@yandex.ru'), True)
        self.assertEqual(main.checkEmail('kkhh@yandex@tff.ru'), False)
        self.assertEqual(main.checkEmail('kkhh@yandex'), False)
        self.assertEqual(main.checkEmail('yandex.ru'), False)


if __name__ == '__main__':
    unittest.main()
