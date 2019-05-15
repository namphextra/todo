import express from 'express';
import HTTPStatus from 'http-status';
import * as Entities from '../entities';
import Base from './base';
import TodoModel from '../models/todo';

class Todo extends Base {
  private _model = new TodoModel()

  private _router = express.Router()

  public init() {
    this.app.use('/api/v1/todos', this._router);
    this.getAllTodos();
    this.createATodo();
  }

  private getAllTodos() {
    this._router.get('/', this._middleware.authenJWT, async (req, res) => {
      const result = await this._model.getAllTodo();

      if (result.success) {
        res.status(HTTPStatus.OK).send({
          success: true,
          todos: result.todos,
        });
      } else {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(result.message);
      }
    });
  }

  private createATodo() {
    this._router.post('/', this._middleware.authenJWT, async (req, res) => {
      const todo: Entities.Todo = {
        Id: 0,
        UpdatedAt: 0,
        IsImportant: req.body.is_important,
        Type: req.body.type,
        Content: req.body.content,
        Title: req.body.title,
        Checked: req.body.checked,
        CreatedAt: Math.floor(new Date().getTime() / 1000),
      };
      const result = await this._model.createTodo(todo);

      if (result.success) {
        res.status(HTTPStatus.OK).send({ success: true });
      } else {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(result.message);
      }
    });
  }
}

export default Todo;
