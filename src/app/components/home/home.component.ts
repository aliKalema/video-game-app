import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../../modeles/game";
import {GameHttpService} from "../../services/game-http.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {APIResponse} from "../../modeles/apiresponse";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string ="";
  games: Array<Game> | undefined;
  private gameSub: Subscription | undefined;
  private routerSub: Subscription | undefined;
  constructor(private httpService: GameHttpService,
              private router: Router,
              private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerSub = this.activedRoute.params.subscribe((params: Params)=> {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }
      else{
        this.searchGames('metacrit');
      }
    })
  }

   searchGames(sort: string, search?: string): void{
    this.gameSub =  this.httpService.getGameList(sort, search).subscribe((gameList:APIResponse<Game>)=>{
      this.games = gameList.results;
    })
  }

  openGameDetails(id: string): void{
    this.router.navigate(['details',id]);
  }
ngOnDestroy(): void{
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }
    if(this.routerSub){
      this.routerSub.unsubscribe();
    }
}


}
