# Argent Bank — Tableau de bord utilisateur

Application web React pour Argent Bank, une nouvelle banque en ligne : authentification, gestion du profil et état global Redux — suivie de la proposition d'API pour les futures fonctionnalités de transactions.

## Contexte

Développement du tableau de bord utilisateur, confié par le CTO en deux phases :

1. **Phase 1 — Application** : livrer l'application React complète et responsive — authentification, profil, déconnexion — avec Redux pour gérer l'état global.
2. **Phase 2 — Conception API** : les transactions étant encore en conception, proposer la modélisation des routes API dans un document Swagger, sans implémenter la page : **[docs/swagger-transactions.yaml](./docs/swagger-transactions.yaml)**.

## Fonctionnalités (phase 1)

- Page d'accueil, page de connexion, page de profil — application complète et responsive
- Authentification avec gestion des erreurs si l'identifiant ou le mot de passe sont incorrects
- Déconnexion, et profil accessible uniquement après une connexion réussie (routes protégées)
- Nom et prénom non modifiables ; pseudo modifiable
- État global Redux : token et profil partagés entre les pages

## Green Code

Conformément aux demandes du CTO, l'intégration suit deux bonnes pratiques :

- **Images optimisées** : en poids et en dimensions, comme pour les maquettes fournies.
- **Composants réutilisables** : créés dès qu'un besoin apparaît deux fois, plutôt que dupliqués.

## Proposition d'API transactions (phase 2)

Le document **[docs/swagger-transactions.yaml](./docs/swagger-transactions.yaml)** spécifie, pour chaque endpoint : la méthode HTTP, la route, sa description, les paramètres possibles et les codes de réponse. Il couvre :

- la récupération des transactions d'un compte, groupées par mois ;
- le détail d'une transaction spécifique ;
- la modification de la catégorie et de la note d'une transaction (sans suppression ni ajout de transaction).

## Technologies

- React + Vite (application montée avec le template Vite officiel)
- Redux (état global de l'application)
- API REST authentifiée par token Bearer
- Swagger pour la documentation et la proposition d'API

## Démarrage

Le front end consomme le back end fourni avec le projet (documentation Swagger incluse), qui doit tourner sur le port **3001**.

```bash
git clone https://github.com/DierWey/ArgentBank.git
cd ArgentBank
npm install
npm run dev
```

Compte de démonstration : `tony@stark.com` / `password123` (fourni avec le back end du projet).

## Liens

- 📁 Repo : [github.com/DierWey/ArgentBank](https://github.com/DierWey/ArgentBank)
- 📄 Proposition d'API : [docs/swagger-transactions.yaml](./docs/swagger-transactions.yaml)
- 🎨 Maquettes et issues : repos OpenClassrooms fournis avec le brief
