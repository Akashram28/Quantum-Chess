import Piece from '../pieces/Piece'
class Queen extends Piece {
	constructor(position, name) {
		super(position, 'queen', name);
	}

	getAllowedMoves(){
		return [
			this.getMovesTop(),
			this.getMovesTopRight(),
			this.getMovesTopLeft(),
			this.getMovesBottom(),
			this.getMovesBottomRight(),
			this.getMovesBottomLeft(),
			this.getMovesRight(),
			this.getMovesLeft()
		];
	}
}

export default Queen