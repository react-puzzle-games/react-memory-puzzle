import logos from './logos';
import randomSubarray from './random-subarray';
import { GAME_STARTED } from './game-states';

export default {
  newGame: () => {
    let randomLogos = randomSubarray(logos, 15);
    randomLogos = randomLogos.concat(randomLogos);

    return {
      gameState: GAME_STARTED,
      tiles: randomSubarray(randomLogos, 30).map(tile => ({
        name: tile.name,
        logo: `${tile.name.toLowerCase()}.png`,
      })),
    }
  }
}
