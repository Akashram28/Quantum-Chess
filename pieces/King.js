import Playscreen from '../screens/Playscreen';
import Piece from '../pieces/Piece'
class King extends Piece {
	constructor(position, name) {
		super(position, 'king', name);
		this.ableToCastle = true;
	}


	getAllowedMoves() {
		const position = this.position;
		const allowedMoves = [
			[parseInt(position) + 1],
			[parseInt(position) - 1],
			[parseInt(position) + 10],
			[parseInt(position) - 10],
			[parseInt(position) + 11],
			[parseInt(position) - 11],
			[parseInt(position) + 9],
			[parseInt(position) - 9]
		];
		return allowedMoves;
	}

	remove_castling_ability() {
		this.ableToCastle = false;
	}

	changePosition(position, castle=false) {
		if (castle) {
			if (position - this.position == 2) Playscreen.castleRook(this.color+'Rook2');
			if (position - this.position == -2) Playscreen.castleRook(this.color+'Rook1');
			this.ableToCastle = false;
		}
		this.position = parseInt(position);
	}
}
export default King