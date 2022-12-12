import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Game} from "../../modeles/game";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GameHttpService} from "../../services/game-http.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating :number | undefined  = 0;
  gameId: string= "";
  game?: Game;

  routerSub: Subscription | undefined;
  gameSub: Subscription | undefined;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private httpService: GameHttpService) { }

  ngOnInit(): void {
    this.routerSub =  this.activatedRoute.params.subscribe((params: Params)=>{
      this.gameId =  params['id'];
      this.gameDetails(this.gameId);
    });
  }
  getColor(): string{
    if(this.gameRating) {
      if (this.gameRating > 75) {
        return '#5ee432';
      } else if (this.gameRating > 50) {
        return '#fffa50';
      } else if (this.gameRating > 30) {
        return '#f7aa38';
      } else {
        return '#ef4655';
      }
    }
    return '#ef4655';
  }

  private gameDetails(id:string){
    this.gameSub =  this.httpService.getGameDetails(id).subscribe((gameResp:Game)=>{
      this.game = gameResp
        setTimeout(()=>{
          this.gameRating = this.game?.metactritic;
        }, 1000);
    })
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
