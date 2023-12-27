export interface StartingCard {
    name: string;
    team: string;
    artifact: string;
    shield: boolean;
    mark: string;
  }
  
  export interface ChangedCard {
    new_name: string;
    new_team: string;
    new_artifact: string;
    new_shield: boolean;
    new_mark: string;
  }
  
  export interface EndOfGame {
    votes: number;
    pointed_at_who: string;
  }
  
  export interface Player {
    starting_card: StartingCard;
    gameplay_changes: ChangedCard[];
    end_of_game: EndOfGame;
  }
