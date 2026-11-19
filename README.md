# Tradutor de Alto Valiriano

Parte do Projeto CampanhaRPG
[![Website](https://img.shields.io/badge/Website-campanharpg.com.br-67247f?style=for-the-badge)](https://campanharpg.com.br)

Tradutor Português ⇄ Alto Valiriano feito para uma campanha de RPG de D&D (o Alto Valiriano faz o papel do idioma dracônico), com base no funcionamento do idioma em Game of Thrones, criado por David J. Peterson.

## Estrutura
```
tradutor-alto-valiriano/
├── index.html        página e interface
├── css/style.css     estilos e temas (Prata e Terra)
├── js/engine.js      motor de tradução: dicionário, declinação, conjugação, regras de frase
├── js/app.js         interface: eventos, temas, dicionário pessoal
└── README.md
```

## Como ampliar o idioma
- Palavras: edite as listas em `SRC` no início de `js/engine.js` (formato `portugues,sinonimo|valiriano`), ou use o campo "Seu dicionário" na página (salvo no navegador).
- Frases prontas: lista `PH` em `js/engine.js`.
- Declinação: função `decl`; conjugação: função `conj`.

## Limites
O vocabulário documentado é pequeno e passado, futuro e voz passiva não são gerados. Formas sem documentação aparecem sublinhadas e na forma base.
