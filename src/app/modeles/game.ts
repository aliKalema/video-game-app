import {Genre} from "./genre";
import {ParentPlatform} from "./parent-platform";
import {Publisher} from "./publisher";
import {Rating} from "./rating";
import {Screenshot} from "./screenshot";
import {Trailer} from "./trailer";

export interface Game {
  id:string;
  name: string;
  background_image: string;
  released: string;
  metacritic_url: string;
  website: string;
  description: string;
  metactritic: number;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publisher>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshot>;
  trailers: Array<Trailer>;
}
