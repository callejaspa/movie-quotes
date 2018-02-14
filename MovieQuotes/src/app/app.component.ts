import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Component } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

interface MovieQuote {
  movie: string;
  quote: string;
  $key?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly quotesPath = "quotes";

  formMovieQuote: MovieQuote = {
    'quote': '',
    'movie': ''
  };

  // movieQuotes: Array<MovieQuote> = [
  //   { "movie": "Rocky", "quote": "Yo Adrian" },
  //   { "movie": "Terminator", "quote": "I'll be back" },
  //   { "movie": "Titanic", "quote": "I'm the king of the world!" },
  //   { "movie": "The Princess Bride", "quote": "Hello. My name is Inigo Montoya. You killed my father. Prepare to die." }
  // ];

  movieQuotesStream: Observable<MovieQuote[]>;

  constructor(db: AngularFireDatabase) {
    this.movieQuotesStream = db.list(this.quotesPath).valueChanges();
  }

  onSubmit(): void {
    // console.log("TODO submit:", this.formMovieQuote);
    // this.movieQuotes.unshift(this.formMovieQuote);
    try {
      this.movieQuotesStream.push(this.formMovieQuote);

      this.formMovieQuote = {
        'quote': '',
        'movie': ''
      };
    } catch (e) {
      console.log("form error:", e);
    }
  }
}
