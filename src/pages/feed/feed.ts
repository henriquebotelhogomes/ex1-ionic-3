import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[
    MoovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
    titulo: "Henrique Botelho Gomes",
    data :"Outubro, 19, 2018",
    descricao: "Estou criando meu primeiro app IONIC 3",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  }

  public lista_filmes = new Array<any>();
  public page = 1;

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: 'Carregando filmes...'
    });
  
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }
  

  public somaDoisNumeros(num1:number, num2:number):void{
    alert(num1+num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  ionViewDidEnter() {
    this.carregarFilmes();    
  }

  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
    
  }

  carregarFilmes(newpage: boolean = false){
    this.abreCarregando();

    //this.somaDoisNumeros(2,8);
    
    this.movieProvider.getPopularMovies(this.page).subscribe(
      data=>{
        const response = (data as any);
        //const objeto_retorno = JSON.parse(response._body);
        if(newpage){
          this.lista_filmes = this.lista_filmes.concat(response.results);
          this.infiniteScroll.complete();
        }else{
          this.lista_filmes = response.results;
        }
        
        console.log(response);
        console.log('-------------------------');
        this.fechaCarregando();

        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }

      }, error=>{
        console.log(error);
        this.fechaCarregando();
      }
    );
  }

}
