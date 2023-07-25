import { PokeApiService } from './../../service/poke-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private allPokemonList: any;
  public pokemonList: any;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe((res) => {
      this.allPokemonList = res.results;
      this.pokemonList = this.allPokemonList;
    });
  }

  public search(q: string): void {
    const filter = this.allPokemonList.filter((res: any) => {
      return !res.name.indexOf(q.toLowerCase())
    })

    this.pokemonList = filter;
  }
}
