export default {
  translation: {
    navBar: {
      header: 'Hexlet Chat',
      logOutBtn: 'Выйти',
    },
    logInPage: {
      header: 'Войти',
      logIn: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      authFailed: 'Неверные имя пользователя и пароль',
      noAcc: 'Нет аккаунта?',
      regestration: 'Регистрация',
    },
    notFoundPage: {
      notFound: 'Страница не найдена',
      redirect: 'Но вы можете перейти',
      mainPage: 'на главную страницу',
    },
    signUpPage: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signUpBtn: 'Зарегестрироваться',
      signUpFailed: 'Такой пользователь уже существует',
      validation: {
        required: 'Обязательное поле',
        usernameLen: 'От 3 до 20 символов',
        passwordLen: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
      },
    },
    chatPage: {
      channelsCol: {
        channels: 'Каналы',
        addChannelBtn: '+',
        removeChannelBtn: 'Удалить',
        renameChannelBtn: 'Переименовать',
        control: 'Управление каналом',
      },
      messageCol: {
        inputField: 'Введите новое сообщение...',
        submitBtn: 'Отправить',
        counter: {
          count_zero: '{{count}} сообщений',
          count_one: '{{count}} сообщение',
          count_few: '{{count}} сообщения',
          count_many: '{{count}} сообщений',
        },
      },
      messageForm: {
        submitBtn: 'Отправить',
      },
    },
  },
};
