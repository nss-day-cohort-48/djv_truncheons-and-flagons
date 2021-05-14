# Prep

- Clear your form data history!
- Run localserve and hit 'y' to refresh the database
- Confirm that upon page load you do _not_ see a leaderboard -- we don't have any scores yet

# Steps

1. Game with one winner

- use teams Mound Makers, Warriors, Watchdogs
  - Round 1: Mound Makers score 2 points, Warriors score 1
  - Round 2: Mound Makers score 1 point, Watchdogs score 2
  - Round 3: Mound Makers score 2 points, Watchdogs score 1 point

<!-- LEADERBOARD SHOULD READ
    Mound Makers:   5
    Watchdogs:      3
    Warriors:       1
-->

2. Add a new team and players

   - Add team "The Blue Sentinels"
   - Show off that you cant start a game with incomplete teams
   - Add three players to the Sentinels:
     - Lady Sirris
     - Knight Horace
     - Anri of Astora ("of Astora" is last name)
   - Show off that you cant add to a full team

3. Two Way Tie

   - Start a game with Watchdogs, Warriors, Sentinels
     - Round 1: Warriors score 3 points, nobody else scores
     - Round 2: Sentinels score 3 points, Warriors score 1
     - Round 3: Sentinels score 1
     - result is tie between Warriors and Sentinels

<!-- LEADERBOARD SHOULD READ
    Mound Makers:   5
    Warriors:       5
    Sentinels:      4
    Watchdogs:      3
-->

3. Note the tie on the leaderboard

4. Three Way Tie

- use Mound Makers, Sentinels, Warriors
  - Round 1: Warriors score 2 points, Mound Makers score 1
  - Round 2: Sentinels score 2 points, Warriors score 1
  - Round 3: Mound Makers score 2 points, Sentinels score 1

<!-- LEADERBOARD SHOULD READ
    Warriors:       8
    Mound Makers:   8
    Sentinels:      7
    Watchdogs:      3
-->
