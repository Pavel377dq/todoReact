My Todo

https://todo-pavel377dq.vercel.app/

Для .eslintrc.json
  Правила в rules сильней чем в extends,
 чтобы не затиралось "tabWidth": 4 в .prettierrc,
 я убрал indent: [2,error] в .eslintrc.json
 С помощью esling-config-prettier исправил
 возможные конфликты с prettier,
 при этом eslint не будет перезатирать правила prettier



 Поставил "@babel/core": "^7.21.8",
          "@babel/eslint-parser": "^7.21.8",
          "@babel/preset-react": "^7.18.6",
 вместо babel-eslint
 для корректной работы анализатора 