import { Component, OnInit } from '@angular/core';
import { SuperInterface } from '../app/herointerface';
import { heros } from '../app/heros';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'SuperWars';
  constructor() { }
  players: SuperInterface[];

  ngOnInit(): void {
    this.players = heros;
    this.viewPlayers(this.initPlayers(this.players));
  }

  //Progression 1
  isFight(superHeroStrength: number, superVillonStrength: number): string {
    if (superHeroStrength > 0 && superVillonStrength > 0) {
      return 'clash';
    }
    else {
      return 'peace';
    }
  }

  //Progression 2
  calculateScore(team: any): number {
    return team.reduce((sum, current) => sum + current.total, 0);;
  }

  //Progression 3
  checkWin(player: any): string {
    return 'endure';
  }

  //Progression 4
  totalScore(team: any): number {
    return team.reduce((sum, current) => sum + current.total, 0);;
  }


  initPlayers = (players) => {
    let detailedPlayers = '';
    detailedPlayers = players.map((value, index) => ({
      name: players[index].name,
      strength: Math.ceil(Math.random() * 100 + 1),
      image: '../assets/super-' + (index + 1) + '.png',
      type: "hero|villian"
    }));
    return detailedPlayers;
  }

  buildPlayers(players: any, type: string): any {
    let fragment: string = '';
    let indexList: number[] = [];
    if (type == "hero") {
      players.map((item, index) => {
        if (index % 2 == 0)
          indexList.push(index);
      });
    } else {
      players.map((item, index) => {
        if (index % 2 != 0)
          indexList.push(index);
      });
    }
    console.log(indexList);

    fragment += indexList.map((index) => `<div class="player">
                <img src="${players[index].image}" alt="">
                <div class="name">${players[index].name}</div>
                <div class="strength">${players[index].strength}</div></div>`
    );
    console.log(players, fragment);
    return fragment;
  }

  viewPlayers = (players) => {
    document.getElementById('heroes').innerHTML = this.buildPlayers(players, 'hero');
    document.getElementById('villains').innerHTML = this.buildPlayers(players, 'villain');
  }
}