class TodosController < ApplicationController
  before_action :set_todo, only: %i[show destroy update]

  def index
    todos = Todo.all.order(created_at: :desc)
    render json: todos, each_serializer: TodoSerializer, scope: current_user
  end

  def show
    render json: @todo, each_serializer: TodoSerializer
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo, each_serializer: TodoSerializer
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @todo.destroy
    render json: @todo, each_serializer: TodoSerializer
  end

  def update
    @todo.title = todo_params[:title] if todo_params[:title].present?
    @todo.is_complete = todo_params[:is_complete] if todo_params.has_key?(:is_complete)
    if @todo.save
      render json: @todo, each_serializer: TodoSerializer
    else
      render json: { status: 500, message: '更新に失敗しました' }
    end
  end

  private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    # def todo_params
    #   params.permit(:title, :user_id)
    # end

    def todo_params
      params.permit(:title, :user_id, :is_complete)
    end
end
