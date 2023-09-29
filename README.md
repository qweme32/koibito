# Koibito
Pretty banners for display the number of views of your profile / repository

![Banner](https://koibito.qweme.dev/@qweme32/koibito?length=5)

![Clickhouse](https://img.shields.io/badge/Clickhouse-000?logo=clickhouse) ![Fastify](https://img.shields.io/badge/Fastify-111?logo=fastify) ![Prettier](https://img.shields.io/badge/Prettier-1A2C34?logo=Prettier&logoColor=F7BA3E)

Language - **English** / [Русский](/README_ru.md)

### Features
- Profile views banner
- Repository views banner
- Easy to install

### Themes
<details><summary>Theme list</summary>

| Name | Author | Preview |
|-----|-------|--------|
| chainsaw-man | [@tremscreeper](https://t.me/tremscreeper) |![Chainsaw-Man](https://koibito.qweme.dev/demo?theme=chainsaw-man) |
| rule34 | rule34 artist |![Chainsaw-Man](https://koibito.qweme.dev/demo?theme=rule34) |

</details>

Read more [here](/themes_ru.md)

### Docs
- Banner for profile  
    in `README.md`
    ```md
    ![Koibito](https://koibito.qweme.dev/@your-name?params=here)
    ```

    ##### Params
    | name   | type                  | default      | description             |
    |--------|-----------------------|--------------|-------------------------|
    | theme  | string                | chainsaw-man | Theme for banner        |
    | scale  | float in 0.5-10 range | 2            | Image scale             |
    | length | int in 0-8 range      | 0            | 0 for auto calc length  |

    ##### Examples
    - Scale 1.5 and length 6
        ```md
        ![Koibito](https://koibito.qweme.dev/@qweme32?scale=1.5&length=6)
        ```
    - Length 5
        ```md
        ![Koibito](https://koibito.qweme.dev/@qweme32?length=5)
        ```
- Banner for repository  
    in `README.md`
    ```md
    ![Koibito](https://koibito.qweme.dev/@your-name/your-repo?params=here)
    ```