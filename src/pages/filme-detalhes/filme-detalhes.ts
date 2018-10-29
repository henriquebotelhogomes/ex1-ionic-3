import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [MoovieProvider]
})
export class FilmeDetalhesPage {
  public filme;
  public filmeid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MoovieProvider,
    ) {
  }

  ionViewDidEnter() {
    this.filmeid = this.navParams.get("id");
    console.log("filme Id recebido: ", this.filmeid);
    this.movieProvider.getMovieDetails(this.filmeid).subscribe(
      data=>{
        //let retorno = (data as any)._body;
        let retorno = (data as any);
        console.log(retorno);
        console.log('-----------------');
        //this.filme = JSON.parse(retorno);
        //this.filme = retorno.result;
        this.filme = retorno;
        console.log(this.filme);
      }, error=>{
        console.log(error);    
      }
    )
  }

}
