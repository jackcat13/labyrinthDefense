# labyrinthDefense game

## Build docker image of front application

In default folder once project is cloned:

```shell
docker build -t labyrinth_defense_front .
docker run -d -p 9080:8080 --name labyrinth_defense_front labyrinth_defense_front
```