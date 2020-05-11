# League of Legends Match History App

Welcome, this is my first big React Native project that I'm designing and developing all by myself in order to showcase my set of skills while also improving them.

I'm building this app with Expo CLI. For state management I chose Redux and I'm using Ducks pattern for it, which I find most convinient.
Most important, all data displayed in the app I'm fetching from Riot Games API.

Features currently available:
* Finding profiles by Summoner name
* Displaying:
  * Summoner info:
    * profile icon
    * profile level
    * solo/duoq rank
    * top 3 champions with highest mastery points
      * champion icon
      * champion name and title
      * mastery level and points
 * match history
   * 5 games are displayed at once
   * total of 150 last games can be looked up
   * pagination is used
   * display:
     * whether game was a victory or defeat
     * game mode
     * kda (kills, deaths, assists) and cs (creep score)
     * game duration
     
# Preview

![](preview.gif)
    
