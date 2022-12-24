import React from 'react';
import { StyleSheet, Text, View, FlatList,TouchableWithoutFeedback,Dimensions,Image, Touchable} from 'react-native';
import King from '../pieces/King'
import Knight from '../pieces/Knight'
import Rook from '../pieces/Rook'
import Bishop from '../pieces/Bishop'
import Queen from '../pieces/Queen'
import Pawn from '../pieces/Pawn'
import { TouchableOpacity } from 'react-native-gesture-handler';

const squareWidth= Dimensions.get('screen').width/8

const images = {
	'whiteRook' : require('../assets/img/whiteRook.png'),
	'whiteBishop' : require('../assets/img/whiteBishop.png'),
	'whiteKnight' : require('../assets/img/whiteKnight.png'),
	'whiteQueen' : require('../assets/img/whiteQueen.png'),
	'whiteKing' : require('../assets/img/whiteKing.png'),
	'whitePawn' : require('../assets/img/whitePawn.png'),
	'blackRook' : require('../assets/img/blackRook.png'),
	'blackBishop' : require('../assets/img/blackBishop.png'),
	'blackKnight' : require('../assets/img/blackKnight.png'),
	'blackQueen' : require('../assets/img/blackQueen.png'),
	'blackKing' : require('../assets/img/blackKing.png'),
	'blackPawn' : require('../assets/img/blackPawn.png'),
	'none' : ''
}

export default class Playscreen extends React.Component{

  constructor(props){
    super(props)
    this.state = {
    	pieces : [],
		turn    : 'white',
		selectedPiece : null,
		allowedMoves : null,
		board : [],
		selectedPiece : null,
		selectedSquare : null
    }
  }

  componentDidMount(){
	this.initializePieces()
  }

  initializePieces = () => {
	let wr1 = new Rook(11, 'whiteRook1')
	let wn1 = new Knight(12, 'whiteKnight1')
	let wb1 = new Bishop(13, 'whiteBishop1')
	let wq =new Queen(14, 'whiteQueen')
	let wk =new King(15, 'whiteKing')
	let wb2 =new Bishop(16, 'whiteBishop2')
	let wn2 =new Knight(17, 'whiteKnight2')
	let wr2 =new Rook(18, 'whiteRook2')
	let wp1 =new Pawn(21, 'whitePawn1')
	let wp2 =new Pawn(22, 'whitePawn2')
	let wp3 =new Pawn(23, 'whitePawn3')
	let wp4 =new Pawn(24, 'whitePawn4')        
	let wp5 =new Pawn(25, 'whitePawn5')
	let wp6 =new Pawn(26, 'whitePawn6')
	let wp7 =new Pawn(27, 'whitePawn7')
	let wp8 =new Pawn(28, 'whitePawn8')

	let bp1 =new Pawn(71, 'blackPawn1')
	let bp2 =new Pawn(72, 'blackPawn2')
	let bp3 =new Pawn(73, 'blackPawn3')
	let bp4 =new Pawn(74, 'blackPawn4')
	let bp5 =new Pawn(75, 'blackPawn5')
	let bp6 =new Pawn(76, 'blackPawn6')
	let bp7 =new Pawn(77, 'blackPawn7')
	let bp8 =new Pawn(78, 'blackPawn8')
	let br1 =new Rook(81, 'blackRook1')
	let bn1 =new Knight(82, 'blackKnight1')
	let bb1 =new Bishop(83, 'blackBishop1')
	let bq =new Queen(84, 'blackQueen')
	let bk =new King(85, 'blackKing')
	let bb2 =new Bishop(86, 'blackBishop2')
	let bn2 =new Knight(87, 'blackKnight2')
	let br2 =new Rook(88, 'blackRook2')

	let pieces = [
		br1,bn1,bb1,bq,bk,bb2,bn2,br2,
		bp1,bp2,bp3,bp4,bp5,bp6,bp7,bp8,

		wp1,wp2,wp3,wp4,wp5,wp6,wp7,wp8,
		wr1,wn1,wb1,wq,wk,wb2,wn2,wr2
	]
	this.setState({pieces : pieces})
  }

	// pieceMove(event) {
	// 	const name = event.target.getAttribute('id');
	// 	const allowedMoves = this.getPieceAllowedMoves(event, name);
	// 	if (allowedMoves) {
	// 		const position = this.getPieceByName(name).position;
	// 		const clickedSquare = document.getElementById(position);

	// 		/*if (event.type == 'click' && this.selectedPiece && this.selectedPiece.name == name) {
	// 			this.setselectedPiece(null);
	// 			return this.clearSquares();
	// 		}*/
	// 		clickedSquare.classList.add('clicked-square');

	// 		allowedMoves.forEach( allowedMove => {
	// 			if (document.body.contains(document.getElementById(allowedMove))) {
	// 				document.getElementById(allowedMove).classList.add('allowed');		
	// 			}	
	// 		});
	// 	}
	// 	else{
	// 		this.clearSquares();
	// 	}
	// }

	// changeTurn() {
	// 	if (this.turn == 'white') {
	// 		this.turn = 'black';
	// 		this.turnSign.innerHTML = "Black's Turn";
	// 	}
	// 	else{
	// 		this.turn = 'white';
	// 		this.turnSign.innerHTML = "White's Turn";
	// 	}
	// }

	// getPiecesByColor(color) {
	// 	return this.state.pieces.filter(obj => {
	// 	  return obj.color === color
	// 	});
	// }

	// getPlayerPositions(color){
	// 	const pieces = this.getPiecesByColor(color);
	// 	return pieces.map( a => parseInt(a.position));
	// }

	// filterPositions(positions) {
	// 	return positions.filter(pos => {
	// 		return pos > 10 && pos < 89
	// 	});
	// };

	// unblockedPositions(allowedPositions=[], position, color, checking=true){
	// 	position = parseInt(position);
	// 	const unblockedPositions = [];

	// 	if (color == 'white') {
	// 		var myBlockedPositions    = this.getPlayerPositions('white');
	// 		var otherBlockedPositions = this.getPlayerPositions('black');
	// 	}
	// 	else{
	// 		var myBlockedPositions    = this.getPlayerPositions('black');
	// 		var otherBlockedPositions = this.getPlayerPositions('white');
	// 	}
		
	// 	if (this.selectedPiece.hasRank('pawn')) {
	// 		for (const move of allowedPositions[0]) { //attacking moves
	// 			if (checking && this.myKingChecked(move)) continue;
	// 			if (otherBlockedPositions.indexOf(move) != -1) unblockedPositions.push(move);
	// 		}
	// 		const blockedPositions = myBlockedPositions + otherBlockedPositions;
	// 		for (const move of allowedPositions[1]) { //moving moves
	// 			if (blockedPositions.indexOf(move) != -1) break;
	// 			else if (checking && this.myKingChecked(move, false)) continue;
	// 			unblockedPositions.push(move);
	// 		}
	// 	}
	// 	else{
	// 		allowedPositions.forEach( allowedPositionsGroup => {
	// 			for (const move of allowedPositionsGroup) {
	// 				if (myBlockedPositions.indexOf(move) != -1) {
	// 					break;
	// 				}
	// 				else if ( checking && this.myKingChecked(move) ) {
	// 					continue;
	// 				}
	// 				unblockedPositions.push(move);
	// 				if (otherBlockedPositions.indexOf(move) != -1) break;
	// 			}
	// 		});
	// 	}
			
	// 	return this.filterPositions(unblockedPositions);
	// }

	// getPieceAllowedMoves(event, pieceName){
	// 	const piece = this.getPieceByName(pieceName);
	// 	if(this.turn == piece.color){
	// 		this.clearSquares();
	// 		this.setselectedPiece(piece);
	// 		if (event.type == 'dragstart') {
	// 			event.dataTransfer.setData("text", event.target.id);
	// 		}

	// 		let pieceAllowedMoves = piece.getAllowedMoves();
	// 		if (piece.rank == 'king') {
	// 			pieceAllowedMoves = this.getCastlingSquares(pieceAllowedMoves);
	// 		}

	// 		const allowedMoves = this.unblockedPositions( pieceAllowedMoves, piece.position, piece.color, true );
	// 		this.allowedMoves = allowedMoves;
	// 		return allowedMoves;
	// 	}
	// 	else if (this.selectedPiece && this.turn == this.selectedPiece.color && this.allowedMoves && this.allowedMoves.indexOf(piece.position) != -1) {
	// 		this.kill(piece);
	// 	}
	// 	else{
	// 		return 0;
	// 	}
	// }

	// getCastlingSquares(allowedMoves) {
	// 	if ( !this.selectedPiece.ableToCastle || this.king_checked(this.turn) ) return allowedMoves;
	// 	const rook1 = this.getPieceByName(this.turn+'Rook1');
	// 	const rook2 = this.getPieceByName(this.turn+'Rook2');
	// 	if (rook1 && rook1.ableToCastle) {
	// 		const castlingPosition = rook1.position + 2
    //         if(
    //             !this.positionHasExistingPiece(castlingPosition - 1) &&
    //             !this.positionHasExistingPiece(castlingPosition) && !this.myKingChecked(castlingPosition, true) &&
    //             !this.positionHasExistingPiece(castlingPosition + 1) && !this.myKingChecked(castlingPosition + 1, true)
    //         )
	// 		allowedMoves[1].push(castlingPosition);
	// 	}
	// 	if (rook2 && rook2.ableToCastle) {
	// 		const castlingPosition = rook2.position - 1;
	// 		if(
    //             !this.positionHasExistingPiece(castlingPosition - 1) && !this.myKingChecked(castlingPosition - 1, true) &&
    //             !this.positionHasExistingPiece(castlingPosition) && !this.myKingChecked(castlingPosition, true)
    //         )
	// 		allowedMoves[0].push(castlingPosition);
	// 	}
	// 	return allowedMoves;
	// }

	// getPieceByName(piecename) {
	// 	return this.pieces.filter( obj => obj.name === piecename )[0];
	// }

	// getPieceByPos(piecePosition) {
	// 	return this.pieces.filter(obj =>  obj.position === piecePosition )[0];
	// }

	// positionHasExistingPiece(position) {
	// 	return this.getPieceByPos(position) != undefined;
	// }

	// setselectedPiece(piece) {
	// 	this.selectedPiece = piece;
	// }

	// movePiece(event, square='') {
	// 	square = square || event.target;
	// 	if (square.classList.contains('allowed')) {
	// 		const selectedPiece = this.selectedPiece;
	// 		if (selectedPiece) {
	// 			const newPosition = square.getAttribute('id');
	// 			if (selectedPiece.hasRank('king') || selectedPiece.hasRank('pawn'))
	// 				selectedPiece.changePosition(newPosition, true);
	// 			else
	// 				selectedPiece.changePosition(newPosition);
	// 			square.append(selectedPiece.img);
	// 			this.clearSquares();
	// 			this.changeTurn();
	// 			if (this.king_checked(this.turn)) {
	// 				if (this.king_dead(this.turn)) {
	// 					this.checkmate(selectedPiece.color);
	// 				}
	// 				else{
	// 					// alert('check');
	// 				}
	// 			}
	// 		}
	// 		else{
	// 			return 0;
	// 		}
	// 	}
	// 	if (event) event.preventDefault();
	// }

	// kill(piece) {
	// 	piece.img.parentNode.removeChild(piece.img);
	// 	piece.img.className = '';

	// 	if (piece.color == 'white') this.whiteSematary.querySelector('.'+piece.rank).append(piece.img);
	// 	else this.blackSematary.querySelector('.'+piece.rank).append(piece.img);

	// 	const chosenSquare = document.getElementById(piece.position);
	// 	this.pieces.splice(this.pieces.indexOf(piece), 1);
	// 	this.movePiece('', chosenSquare);
	// }

	// castleRook(rookName) {
	// 	const rook = this.getPieceByName(rookName);
	// 	const newPosition = rookName.indexOf('Rook2') != -1 ? rook.position - 2 : rook.position + 3;

	// 	this.setselectedPiece(rook);
	// 	const chosenSquare = document.getElementById(newPosition);
	// 	chosenSquare.classList.add('allowed');

	// 	this.movePiece('', chosenSquare );
	// 	this.changeTurn();
	// }

	// promote(pawn) {
	// 	const queenName = pawn.name.replace('Pawn', 'Queen');
	// 	const image = pawn.img;
	// 	image.id = queenName;
	// 	image.src = image.src.replace('Pawn', 'Queen');
	// 	this.pieces.splice(this.pieces.indexOf(pawn), 1);
	// 	this.pieces.push( new Queen(pawn.position, queenName) );
	// }

	// myKingChecked(pos, kill=true){
	// 	const piece = this.selectedPiece;
	// 	const originalPosition = piece.position;
	// 	const otherPiece = this.getPieceByPos(pos);
	// 	const should_kill_other_piece = kill && otherPiece && otherPiece.rank != 'king';
	// 	piece.changePosition(pos);
	// 	if (should_kill_other_piece) this.pieces.splice(this.pieces.indexOf(otherPiece), 1);
	// 	if (this.king_checked(piece.color)) {
	// 		piece.changePosition(originalPosition);
	// 		if (should_kill_other_piece) this.pieces.push(otherPiece);
	// 		return 1;
	// 	}
	// 	else{
	// 		piece.changePosition(originalPosition);
	// 		if (should_kill_other_piece) this.pieces.push(otherPiece);
	// 		return 0;
	// 	}
	// }

	// king_dead(color) {
	// 	const pieces = this.getPiecesByColor(color);
	// 	for (const piece of pieces) {
	// 		this.setselectedPiece(piece);
	// 		const allowedMoves = this.unblockedPositions( piece.getAllowedMoves(), piece.position, piece.color, true );
	// 		if (allowedMoves.length) {
	// 			this.setselectedPiece(null);
	// 			return 0;
	// 		}
	// 	}
	// 	this.setselectedPiece(null);
	// 	return 1;
	// }

	// king_checked(color) {
	// 	const piece = this.selectedPiece;
	// 	const king = this.getPieceByName(color + 'King');
	// 	const enemyColor = (color == 'white') ? 'black' : 'white';
	// 	const enemyPieces = this.getPiecesByColor(enemyColor);
	// 	for (const enemyPiece of enemyPieces) {
	// 		this.setselectedPiece(enemyPiece);
	// 		const allowedMoves = this.unblockedPositions( enemyPiece.getAllowedMoves(), enemyPiece.position, enemyColor, false );
	// 		if (allowedMoves.indexOf(king.position) != -1) {
	// 			this.setselectedPiece(piece);
	// 			return 1;
	// 		}
	// 	}
	// 	this.setselectedPiece(piece);
	// 	return 0;
	// }

	// clearSquares(){
	// 	this.allowedMoves = null;
	// 	const allowedSquares = this.board.querySelectorAll('.allowed');
	// 	allowedSquares.forEach( allowedSquare => allowedSquare.classList.remove('allowed') );
	// 	const cllickedSquare = document.getElementsByClassName('clicked-square')[0];
	// 	if (cllickedSquare) cllickedSquare.classList.remove('clicked-square');
	// }

	// checkmate(color){
	// 	const endScene = document.getElementById('endscene');
	// 	endScene.getElementsByClassName('winning-sign')[0].innerHTML = color + ' Wins';
	// 	endScene.classList.add('show');
	// }

	// UI functions
	
	
	
	getblackorwhite = (i,j) => {
		if((i%2 != 0 && j%2 !=0) || (i%2 == 0 && j%2 ==0)){
			return 'black'
		}
		else{
			return 'white'
		}
	}
	getPieceInSquare = (i,j) => {
		let piece = 'none'
		let pieces = this.state.pieces
		for (let x = 0; x < this.state.pieces.length; x++){
			let obj = pieces[x]
			if(parseInt(obj.position) == parseInt(i.toString() + j.toString())){
				piece =  obj.name
			}
		}
		return piece
		
	}
	getFlatlistData = () => {
		let data = []
		for (let i = 1; i <=8; i++) {
			for (let j = 8; j > 0; j--) {
				let square = {
					id : i.toString() + j.toString(),
					color : this.getblackorwhite(i,j),
					piece : this.getPieceInSquare(i,j),
				}
				data.push(square)
			}
		}
		data.reverse()
		return data
	}
	getImageInSquare = (value) => {
		// console.log(value)
		if(value == 'whiteKing' || value == 'whiteQueen' || value == 'blackKing' || value == 'blackQueen'){
			return images[value]
		}
		else{
			return images[value.substring(0,value.length-1)]
		}
	}
	getSquareColor = (pos,squareColor) => {
		let color = (squareColor == 'white')?'white':'#02B290'
		if(pos == this.state.selectedSquare){
			color = '#59981A'
		}
		return color
	}

  
  render(){
  return (
    <View style={styles.container}>
      <View style={styles.board}>
		<FlatList 
		data={this.getFlatlistData()}
		numColumns={8}
		columnWrapperStyle={styles.boardRow}
		renderItem={({item}) => {
			return(
				<View>
					<TouchableWithoutFeedback
					onPress={() => {
						if(item.piece.substring(0,5) == this.state.turn){
						this.setState({selectedPiece : item.piece, selectedSquare : item.id})
						}
					}
					}
					>
						<View 
						style={[styles.square,{backgroundColor : this.getSquareColor(item.id,item.color)}]}
						>
							<Image 
							source={this.getImageInSquare(item.piece)}
							style={styles.pieceStyle}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>

			)}}
		keyExtractor={item => item.id}
		/>
	  </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	width : '100%',
	padding : 5
  },
  board : {
	marginTop : 20,
	width : '100%',
  },
  boardRow : {
	width : '100%'
  },

  square : {
	width: squareWidth,
	height : squareWidth,
	justifyContent : 'center',
	alignItems : 'center',
  },
  pieceStyle : {
	width : squareWidth -10,
	height : squareWidth -10
  }
});
