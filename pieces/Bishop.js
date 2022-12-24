import Piece from '../pieces/Piece'
class Bishop extends Piece {
	constructor(position, name) {
		super(position, 'bishop', name);
	}

	getAllowedMoves() {
		return [ this.getMovesTopRight(), this.getMovesTopLeft(), this.getMovesBottomRight(), this.getMovesBottomLeft() ];
	}
}

export default Bishop