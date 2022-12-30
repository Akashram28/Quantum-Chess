import React from 'react';
import { StyleSheet, Text, View, FlatList,TouchableWithoutFeedback,Dimensions,Image, Touchable} from 'react-native';
import King from '../pieces/King'
import Knight from '../pieces/Knight'
import Rook from '../pieces/Rook'
import Bishop from '../pieces/Bishop'
import Queen from '../pieces/Queen'
import Pawn from '../pieces/Pawn'

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
	'non' : ''
}

export default class Playscreen extends React.Component{

  constructor(props){
    super(props)
    this.state = {
    	pieces : [],
		turn    : 'white',
		board : [],
		selectedPiece : null,
		selectedPiece : null,
		selectedSquare : null,
		targetSquare : null,
		allowedMoves : null,
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
	this.setState({pieces : pieces},() => this.getFlatlistData())
  }

	onSquareClicked = (item) => {
		if(this.getPieceByName(item.piece) == this.state.selectedPiece && item.piece != 'none'){
			this.setState({selectedPiece : null, selectedSquare : null,targetSquare : null})
			console.log('Deselected ' + item.piece)
		}
		else if(this.state.selectedPiece!=null && this.state.selectedSquare!=null){
			console.log('Moving ' + this.state.selectedPiece.name + " to " + item.id)
			// console.log(this.state.selectedSquare)
			this.setState({targetSquare : item.id},() => {this.movePiece(this.state.targetSquare)})
			
		}
		else if(item.piece.substring(0,5) == this.state.turn && (this.state.selectedPiece == null || this.state.selectedPiece.color == this.state.turn)){
			let selectedPiece = this.getPieceByName(item.piece)
			this.setState({selectedSquare : item.id, selectedPiece : selectedPiece,targetSquare : null} ,() => {this.pieceClicked(item)})
			console.log("Slelected " + item.piece + ' at ' +  item.id)
		}
		
		
	}

	pieceClicked = (item) => {
		this.getPieceAllowedMoves(item.piece);
		// console.log(this.state.selectedSquare)
	}

	// pieceMove(item){
	// 	let name = item.piece
	// 	let allowedMoves = this.getPieceAllowedMoves(name);
	// 	if (allowedMoves) {
	// 		let position = this.getPieceByName(name).position;
	// 		const clickedSquare = item.id;

	// 		// if (this.state.selectedPiece && this.state.selectedPiece.name == name){
	// 		// 	this.setselectedPiece(null);
	// 		// 	return this.clearSquares();
	// 		// }
	// 		// clickedSquare.classList.add('clicked-square');
	// 		// allowedMoves.forEach( allowedMove => {
	// 		// 	if (document.body.contains(document.getElementById(allowedMove))) {
	// 		// 		document.getElementById(allowedMove).classList.add('allowed');		
	// 		// 	}	
	// 		// });
	// 	}
	// 	else{
	// 		this.clearSquares();
	// 	}
	// }
	capturePiece = (pos,color) => {
		let pieces = this.state.pieces
		for (let i = 0; i < pieces.length; i++) {
			if(pieces[i].position == pos && pieces[i].color != color){
				pieces.splice(i,1)

			}
		}
		this.setState({pieces:pieces})
	}

	changeTurn() {
		if (this.state.turn == 'white') {
			this.setState({turn : 'black'})
		}
		else{
			this.setState({turn : 'white'})
		}
	}

	getPiecesByColor(color) {
		return this.state.pieces.filter(obj => {
		  return obj.color === color
		});
	}

	getPlayerPositions(color){
		let pieces = this.getPiecesByColor(color);
		return pieces.map( a => parseInt(a.position));
	}

	filterPositions(positions) {
		return positions.filter(pos => {
			return pos > 10 && pos < 89
		});
	};

	unblockedPositions(allowedPositions=[], position, color, checking=true){
		position = parseInt(position);
		let unblockedPositions = [];

		if (color == 'white') {
			var myBlockedPositions    = this.getPlayerPositions('white');
			var otherBlockedPositions = this.getPlayerPositions('black');
		}
		else{
			var myBlockedPositions    = this.getPlayerPositions('black');
			var otherBlockedPositions = this.getPlayerPositions('white');
		}
		
		if (this.state.selectedPiece.hasRank('pawn')) {
			for (let move of allowedPositions[0]) { //attacking moves
				if (checking && this.myKingChecked(move)) continue;
				if (otherBlockedPositions.indexOf(move) != -1) unblockedPositions.push(move);
			}
			let blockedPositions = myBlockedPositions + otherBlockedPositions;
			for (let move of allowedPositions[1]) { //moving moves
				if (blockedPositions.indexOf(move) != -1) break;
				else if (checking && this.myKingChecked(move, false)) continue;
				unblockedPositions.push(move);
			}
		}
		else{
			allowedPositions.forEach( allowedPositionsGroup => {
				for (let move of allowedPositionsGroup) {
					if (myBlockedPositions.indexOf(move) != -1) {
						break;
					}
					else if ( checking && this.myKingChecked(move) ) {
						continue;
					}
					unblockedPositions.push(move);
					if (otherBlockedPositions.indexOf(move) != -1) break;
				}
			});
		}
			
		return this.filterPositions(unblockedPositions);
	}

	getPieceAllowedMoves(pieceName){
		let piece = this.getPieceByName(pieceName);
		if(this.state.turn == piece.color){
			this.clearSquares();
			this.setselectedPiece(piece);
			// console.log(this.state.selectedPiece)
			let pieceAllowedMoves = piece.getAllowedMoves();
			// console.log(pieceAllowedMoves)
			if (piece.rank == 'king') {
				pieceAllowedMoves = this.getCastlingSquares(pieceAllowedMoves);
			}
			let allowedMoves = this.unblockedPositions( pieceAllowedMoves, piece.position, piece.color, true );
			this.setState({allowedMoves : allowedMoves})
			// console.log(allowedMoves)
			// return allowedMoves;
		}
		else if (this.state.selectedPiece && this.state.turn == this.state.selectedPiece.color && this.state.allowedMoves && this.state.allowedMoves.indexOf(piece.position) != -1) {
			this.kill(piece);
		}
		else{
			return 0;
		}
	}

	getCastlingSquares(allowedMoves) {
		if ( !this.state.selectedPiece.ableToCastle || this.king_checked(this.state.turn) ) return allowedMoves;
		let rook1 = this.getPieceByName(this.state.turn+'Rook1');
		let rook2 = this.getPieceByName(this.state.turn+'Rook2');
		if (rook1 && rook1.ableToCastle) {
			let castlingPosition = rook1.position + 2
            if(
                !this.positionHasExistingPiece(castlingPosition - 1) &&
                !this.positionHasExistingPiece(castlingPosition) && !this.myKingChecked(castlingPosition, true) &&
                !this.positionHasExistingPiece(castlingPosition + 1) && !this.myKingChecked(castlingPosition + 1, true)
            )
			allowedMoves[1].push(castlingPosition);
		}
		if (rook2 && rook2.ableToCastle) {
			let castlingPosition = rook2.position - 1;
			if(
                !this.positionHasExistingPiece(castlingPosition - 1) && !this.myKingChecked(castlingPosition - 1, true) &&
                !this.positionHasExistingPiece(castlingPosition) && !this.myKingChecked(castlingPosition, true)
            )
			allowedMoves[0].push(castlingPosition);
		}
		return allowedMoves;
	}

	getPieceByName(piecename) {
		return this.state.pieces.filter( obj => obj.name === piecename )[0];
	}

	getPieceByPos(piecePosition) {
		return this.state.pieces.filter(obj =>  obj.position === piecePosition )[0];
	}

	positionHasExistingPiece(position) {
		return this.getPieceByPos(position) != undefined;
	}

	setselectedPiece(piece){
		this.setState({selectedPiece : piece})
	}

	movePiece(target) {
		let square = target;
		// console.log(this.state.allowedMoves,square)
		if (this.state.allowedMoves.includes(parseInt(square))) {
			let selectedPiece = this.state.selectedPiece;
			if (selectedPiece){
				let newPosition = square;
				if (selectedPiece.hasRank('king') || selectedPiece.hasRank('pawn')){
					selectedPiece.changePosition(newPosition, true);
					this.capturePiece(newPosition,this.state.turn)
				}
				else{
					selectedPiece.changePosition(newPosition);
					this.capturePiece(newPosition,this.state.turn)
				}
				// square.append(selectedPiece.img)
				let data = this.state.board
				data.forEach((element,index) => {
					if(parseInt(element.id) == square){
						element.piece = this.state.selectedPiece
					}
					else if(parseInt(element.id) == this.state.selectedSquare){
						element.piece = 'none'
					}
				})
				this.setState({
					board : data
				})
				this.setState({selectedPiece : null,selectedSquare : null,targetSquare : null,allowedMoves : null},() => {
					this.clearSquares();
					this.changeTurn();
				})
				
				if (this.king_checked(this.state.turn)) {
					if (this.king_dead(this.state.turn)) {
						this.checkmate(selectedPiece.color);
					}
					else{
						// alert('check');
					}
				}
			}
			else{
				return 0;
			}
		}
		// if (event) event.preventDefault();
	}

	kill(piece) {
		// piece.img.parentNode.removeChild(piece.img);
		// piece.img.className = '';

		// if (piece.color == 'white') this.whiteSematary.querySelector('.'+piece.rank).append(piece.img);
		// else this.blackSematary.querySelector('.'+piece.rank).append(piece.img);

		
		let pieces = this.state.pieces.splice(this.state.pieces.indexOf(piece), 1);
		console.log(pieces.length)
		this.setState({pieces : pieces},() => {this.movePiece(chosenSquare)})
		
	}

	castleRook(rookName) {
		let rook = this.getPieceByName(rookName);
		let newPosition = rookName.indexOf('Rook2') != -1 ? rook.position - 2 : rook.position + 3;

		this.setselectedPiece(rook);
		// let chosenSquare = document.getElementById(newPosition);
		// chosenSquare.classList.add('allowed');

		this.movePiece(newPosition);
		this.changeTurn();
	}

	promote(pawn) {
		let queenName = pawn.name.replace('Pawn', 'Queen');
		let image = pawn.img;
		image.id = queenName;
		image.src = image.src.replace('Pawn', 'Queen');
		this.state.pieces.splice(this.state.pieces.indexOf(pawn), 1);
		this.state.pieces.push( new Queen(pawn.position, queenName) );
	}

	myKingChecked(pos, kill=true){
		let piece = this.state.selectedPiece;
		let originalPosition = piece.position;
		let otherPiece = this.getPieceByPos(pos);
		let should_kill_other_piece = kill && otherPiece && otherPiece.rank != 'king';
		piece.changePosition(pos);
		if (should_kill_other_piece) this.state.pieces.splice(this.state.pieces.indexOf(otherPiece), 1);
		if (this.king_checked(piece.color)) {
			piece.changePosition(originalPosition);
			if (should_kill_other_piece) this.state.pieces.push(otherPiece);
			return 1;
		}
		else{
			piece.changePosition(originalPosition);
			if (should_kill_other_piece) this.state.pieces.push(otherPiece);
			return 0;
		}
	}

	king_dead(color) {
		let pieces = this.getPiecesByColor(color);
		for (let piece of pieces) {
			this.setselectedPiece(piece);
			let allowedMoves = this.unblockedPositions( piece.getAllowedMoves(), piece.position, piece.color, true );
			if (allowedMoves.length){
				this.setselectedPiece(null);
				return 0;
			}
		}
		this.setselectedPiece(null);
		return 1;
	}

	king_checked(color) {
		let piece = this.state.selectedPiece;
		let king = this.getPieceByName(color + 'King');
		// console.log(king)
		let enemyColor = (color == 'white') ? 'black' : 'white';
		let enemyPieces = this.getPiecesByColor(enemyColor);
		for (let enemyPiece of enemyPieces) {
			this.setselectedPiece(enemyPiece);
			let allowedMoves = this.unblockedPositions( enemyPiece.getAllowedMoves(), enemyPiece.position, enemyColor, false );
			if (allowedMoves.indexOf(king.position) != -1) {
				this.setselectedPiece(piece);
				return 1;
			}
		}
		this.setselectedPiece(piece);
		return 0;
	}

	clearSquares(){
		this.setState({
			selectedPiece : null
		}, () =>{this.getFlatlistData()})
		// let allowedSquares = this.board.querySelectorAll('.allowed');
		// allowedSquares.forEach( allowedSquare => allowedSquare.classList.remove('allowed') );
		// let cllickedSquare = document.getElementsByClassName('clicked-square')[0];
		// if (cllickedSquare) cllickedSquare.classList.remove('clicked-square');
	}

	checkmate(color){
		// let endScene = document.getElementById('endscene');
		// endScene.getElementsByClassName('winning-sign')[0].innerHTML = color + ' Wins';
		// endScene.classList.add('show');
		console.log(`${color} wins`)
	}

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
					isAllowedMove : false,
				}
				data.push(square)
			}
		}
		data.reverse()
		this.setState({board : data})
	}
	getImageInSquare = (value) => {
		// console.log(value)
		if(value == 'whiteKing' || value == 'whiteQueen' || value == 'blackKing' || value == 'blackQueen'){
			return images[value]
		}
		else if(typeof(value) == "string"){
			value = value.substring(0,value.length-1)
			// console.log(value)
			return images[value]
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
		data={this.state.board}
		numColumns={8}
		columnWrapperStyle={styles.boardRow}
		renderItem={({item}) => {
			return(
				<View>
					<TouchableWithoutFeedback
					onPress={() => {
						this.onSquareClicked(item)
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
