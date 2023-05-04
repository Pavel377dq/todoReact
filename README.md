My Todo

https://todo-pavel377dq.vercel.app/

Для .eslintrc.json
Правила в rules сильней чем в extends,
 чтобы не затиралось "tabWidth": 4 в .prettierrc,
 я убрал indent: [2,error] в .eslintrc.json

 С помощью esling-config-prettier исправил возможные конфликты с prettier,
  при этом eslint не будет перезатирать правила prettier

  "parser": "babel-eslint" не стал применять тк почему-то при этом как-будто бы работает 
  только babel-eslint

    Похоже не надо было в plugins указывать react, import тк они в extends