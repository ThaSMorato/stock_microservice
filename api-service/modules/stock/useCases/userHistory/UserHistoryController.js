export class UserHistoryController {
  constructor({ userHistoryUseCase }) {
    this.userHistoryUseCase = userHistoryUseCase;
  }

  async handle(request, response) {
    const { user_id } = request;

    const history = await this.userHistoryUseCase.execute(user_id);

    return response.status(200).json(history);
  }
}
