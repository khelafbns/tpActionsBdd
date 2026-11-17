1. Différence entre un job et une étape (step) ?
Un job est un ensemble d’étapes exécuté sur une même machine (runner). Une étape est une action ou une commande unique à l’intérieur d’un job. Les étapes s’exécutent dans l’ordre, et chaque job a sa propre machine, indépendante des autres.

2. Pourquoi les 4 jobs s’exécutent-ils en même temps ? Comment imposer un ordre ?
Parce qu’ils sont indépendants : sans dépendance déclarée, GitHub les lance en parallèle pour gagner du temps. On impose un ordre avec le mot-clé needs: (exemple : needs: [python, node, java, php]).

3. Pourquoi ne jamais écrire un mot de passe de production dans le YAML ? Où le mettre ?
Le fichier YAML est versionné : toute personne ayant accès au dépôt le voit, et il reste dans l’historique Git même après suppression. Il faut le stocker dans les GitHub Secrets (Settings → Secrets and variables → Actions) et le lire avec ${{ secrets.NOM }}.

4. Pourquoi la base est-elle recréée à chaque exécution ? Quel avantage ?
Parce que le runner est une machine neuve et jetable, détruite après le job. L’avantage : chaque exécution démarre d’un état propre et connu, donc les tests sont reproductibles et ne dépendent pas d’anciennes données.

5. Test unitaire vs test d’intégration ? Quel type ici ?
Un test unitaire vérifie une petite partie de code de façon isolée (sans dépendance réelle). Un test d’intégration vérifie que plusieurs composants fonctionnent ensemble. Les tests de ce TP sont des tests d’intégration, car ils utilisent la vraie base PostgreSQL.
