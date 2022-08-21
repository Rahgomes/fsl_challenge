import mockFetch from "cross-fetch";
import reducer, { checkNodeStatus, checkNodeBlocks } from "./nodes";
import { Node } from "../types/Node";
import initialState from "./initialState";

jest.mock("cross-fetch");

const mockedFech: jest.Mock<unknown> = mockFetch as any;

describe("Reducers::Nodes", () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA: Node = {
    url: "http://localhost:3002",
    online: false,
    name: "Node 1",
    loading: false,
    blocks: {
      loading: false,
      data: [
        {
          id: "",
          type: "",
          attributes: {
            index: 0,
            timestamp: 0,
            data: "",
            "previous-hash": "",
            hash: "",
          },
        },
      ],
    },
  };

  const nodeB: Node = {
    url: "http://localhost:3003",
    online: false,
    name: "Node 2",
    loading: false,
    blocks: {
      loading: false,
      data: [
        {
          id: "",
          type: "",
          attributes: {
            index: 0,
            timestamp: 0,
            data: "",
            "previous-hash": "",
            hash: "",
          },
        },
      ],
    },
  };

  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle checkNodeStatus.pending", () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = { type: checkNodeStatus.pending, meta: { arg: nodeA } };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle checkNodeStatus.fulfilled", () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = {
      type: checkNodeStatus.fulfilled,
      meta: { arg: nodeA },
      payload: { node_name: "alpha" },
    };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          name: "alpha",
          loading: false,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle checkNodeStatus.rejected", () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          name: "alpha",
          loading: false,
        },
        nodeB,
      ],
    };
    const action = { type: checkNodeStatus.rejected, meta: { arg: nodeA } };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          name: "alpha",
          loading: false,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle checkNodeBlocks.pending", () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = { type: checkNodeBlocks.pending, meta: { arg: nodeA } };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            ...nodeA.blocks,
            loading: true,
          },
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle checkNodeBlocks.fulfilled", () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = {
      type: checkNodeBlocks.fulfilled,
      meta: { arg: nodeA },
      payload: {
        data: [
          {
            id: "",
            type: "",
            attributes: {
              index: 0,
              timestamp: 0,
              data: "",
              "previous-hash": "",
              hash: "",
            },
          },
        ],
      },
    };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            loading: false,
            data: [...nodeA.blocks.data, ...action.payload.data],
          },
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle checkNodeBlocks.rejected", () => {
    const appState = {
      list: [
        {
          ...nodeA,
          blocks: {
            loading: false,
            data: nodeA.blocks.data,
          },
        },
        nodeB,
      ],
    };
    const action = { type: checkNodeBlocks.rejected, meta: { arg: nodeA } };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            loading: false,
            data: nodeA.blocks.data,
          },
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});

describe("Actions::Nodes", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockedFech.mockClear();
  });

  const node: Node = {
    url: "http://localhost:3002",
    online: false,
    name: "Node 1",
    loading: false,
    blocks: {
      loading: false,
      data: [
        {
          id: "",
          type: "",
          attributes: {
            index: 0,
            timestamp: 0,
            data: "",
            "previous-hash": "",
            hash: "",
          },
        },
      ],
    },
  };

  it("should fetch the node status", async () => {
    mockedFech.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ node_name: "Secret Lowlands" });
        },
      })
    );
    await checkNodeStatus(node)(dispatch, () => {}, {});

    const expected = expect.arrayContaining([
      expect.objectContaining({
        type: checkNodeStatus.pending.type,
        meta: expect.objectContaining({ arg: node }),
      }),
      expect.objectContaining({
        type: checkNodeStatus.fulfilled.type,
        meta: expect.objectContaining({ arg: node }),
        payload: { node_name: "Secret Lowlands" },
      }),
    ]);
    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node status", async () => {
    mockedFech.mockReturnValueOnce(Promise.reject(new Error("Network Error")));
    await checkNodeStatus(node)(dispatch, () => {}, {});
    const expected = expect.arrayContaining([
      expect.objectContaining({
        type: checkNodeStatus.pending.type,
        meta: expect.objectContaining({ arg: node }),
      }),
      expect.objectContaining({
        type: checkNodeStatus.rejected.type,
        meta: expect.objectContaining({ arg: node }),
        error: expect.objectContaining({ message: "Network Error" }),
      }),
    ]);

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fetch the node blocks", async () => {
    mockedFech.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({
            data: [
              {
                id: "",
                type: "",
                attributes: {
                  index: 0,
                  timestamp: 0,
                  data: "",
                  "previous-hash": "",
                  hash: "",
                },
              },
            ],
          });
        },
      })
    );
    await checkNodeBlocks(node)(dispatch, () => {}, {});

    const expected = expect.arrayContaining([
      expect.objectContaining({
        type: checkNodeBlocks.pending.type,
        meta: expect.objectContaining({ arg: node }),
      }),
      expect.objectContaining({
        type: checkNodeBlocks.fulfilled.type,
        meta: expect.objectContaining({ arg: node }),
        payload: {
          data: [
            {
              id: "",
              type: "",
              attributes: {
                index: 0,
                timestamp: 0,
                data: "",
                "previous-hash": "",
                hash: "",
              },
            },
          ],
        },
      }),
    ]);
    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node blocks", async () => {
    mockedFech.mockReturnValueOnce(Promise.reject(new Error("Fail to get blocks")));
    await checkNodeBlocks(node)(dispatch, () => {}, {});
    const expected = expect.arrayContaining([
      expect.objectContaining({
        type: checkNodeBlocks.pending.type,
        meta: expect.objectContaining({ arg: node }),
      }),
      expect.objectContaining({
        type: checkNodeBlocks.rejected.type,
        meta: expect.objectContaining({ arg: node }),
        error: expect.objectContaining({ message: "Fail to get blocks" }),
      }),
    ]);

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
