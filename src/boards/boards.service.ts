import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { uuid } from 'uuidv4';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const newBoard: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(newBoard);
    return newBoard;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): string {
    try {
      this.boards = this.boards.filter((board) => board.id !== id);
      return 'success';
    } catch {
      return 'error';
    }
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const changedBoard = this.getBoardById(id);
    changedBoard.status = status;
    return changedBoard;
  }
}
