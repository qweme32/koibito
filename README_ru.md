# Koibito
Красивые баннеры для отображения количества просмотров вашего профиля / репозитория  

![Banner](https://koibito.qweme.dev/@qweme32/koibito?length=5)

![Mongo](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white) ![Fastify](https://img.shields.io/badge/Fastify-111?logo=fastify) ![Prettier](https://img.shields.io/badge/Prettier-1A2C34?logo=Prettier&logoColor=F7BA3E)  
![GitHub Repo stars](https://img.shields.io/github/stars/qweme32/koibito?logo=github&logoColor=white&label=Stars%20%20&labelColor=100000&color=f5de47)
![Used](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fkoibito.qweme.dev%2Fusages&query=%24.value&logo=github&logoColor=white&label=Used&labelColor=100000&color=white)

Язык - [English](/README.md) / **Русский**

### Возможности
- Баннер для отображения количества просмотров профиля
- Баннер для отображения количества просмотров репозитория
- Легок в установке

### Темы
<details><summary>Список всех тем</summary>

| Имя | Автор | Превью |
|-----|-------|--------|
| chainsaw-man | [@tremscreeper](https://t.me/tremscreeper) |![Chainsaw-Man](https://koibito.qweme.dev/demo?theme=chainsaw-man) |
| rule34 | rule34 artist |![Chainsaw-Man](https://koibito.qweme.dev/demo?theme=rule34) |

</details>

Подробнее [здесь](/themes_ru.md)

### Документация
- Баннер для профиля
    в `README.md`
    ```md
    ![Koibito](https://koibito.qweme.dev/@your-name?params=here)
    ```

    ##### Параметры
    | name   | type                  | default      | description             |
    |--------|-----------------------|--------------|-------------------------|
    | theme  | string                | chainsaw-man | Theme for banner        |
    | scale  | float in 0.5-10 range | 2            | Image scale             |
    | length | int in 0-8 range      | 0            | 0 for auto calc length  |

    ##### Примеры
    - Скейл 1.5 и длина 6
        ```md
        ![Koibito](https://koibito.qweme.dev/@qweme32?scale=1.5&length=6)
        ```
    - Длина 5
        ```md
        ![Koibito](https://koibito.qweme.dev/@qweme32?length=5)
        ```
- Баннер для репозитория
    в `README.md`
    ```md
    ![Koibito](https://koibito.qweme.dev/@your-name/your-repo?params=here)
    ```