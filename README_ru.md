# Koibito
Красивые баннеры для отображения количества просмотров вашего профиля / репозитория
![Banner](https://koibito.qweme.dev/@qweme32/koibito?length=5)

![Clickhouse](https://img.shields.io/badge/Clickhouse-000?logo=clickhouse) ![Fastify](https://img.shields.io/badge/Fastify-111?logo=fastify) ![Prettier](https://img.shields.io/badge/Prettier-1A2C34?logo=Prettier&logoColor=F7BA3E)

Язык - [English](/README.md) / **Русский**

### Возможности
- Баннер для отображения количества просмотров профиля
- Баннер для отображения количества просмотров репозитория
- Легок в установке

### Документация
- [Доступные темы](/themes_ru.md)
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