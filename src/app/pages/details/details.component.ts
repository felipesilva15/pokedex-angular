import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon(): Subscription {
    const id = this.activatedRoute.snapshot.params['id'];

    const pokemon = this.pokeApiService.apiGetPokemon(`${this.urlPokemon}/${id}`)
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`)

    return forkJoin(pokemon, name).subscribe(
      (res) => {
        this.pokemon = res;
        this.isLoading = true;
      },
      (err) => {
        this.apiError = true;
      }
    );
  }

  public formatStatName(text: string): string {
    if (!text) {
      return '';
    }

    text = text.replaceAll('-', ' ');
    
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
