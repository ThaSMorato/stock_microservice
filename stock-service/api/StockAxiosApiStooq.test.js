import { describe, it, jest, expect } from "@jest/globals";
import { StockAxiosAPiStooq } from "./StockAxiosApiStooq";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockedAxios = new MockAdapter(axios);

const getResponse = "ID,NAME,VALUE\n1,Thales,100\n2,Jhon,50";

const expectedResponse = [
  {
    ID: "1",
    NAME: "Thales",
    VALUE: "100",
  },
  {
    ID: "2",
    NAME: "Jhon",
    VALUE: "50",
  },
];

const id = "123";

mockedAxios.onGet(`https://stooq.com/q/l/`).reply(200, getResponse);

describe("#Unit test StockAxiosApiStooq", () => {
  it("should receive a csv and return a json", async () => {
    const api = new StockAxiosAPiStooq();

    const json = await api._handleCSVFile(getResponse, "123");

    expect(json).toStrictEqual(expectedResponse);
  });

  it("should the json from _handleCSVFile", async () => {
    const api = new StockAxiosAPiStooq();

    const spyOnHandleCSVFile = jest.spyOn(
      StockAxiosAPiStooq.prototype,
      StockAxiosAPiStooq.prototype._handleCSVFile.name
    );

    spyOnHandleCSVFile.mockResolvedValue(expectedResponse);

    const response = await api.get({ id });

    expect(response).toStrictEqual(expectedResponse);
    expect(spyOnHandleCSVFile).toBeCalledWith(getResponse, id);
  });
});
