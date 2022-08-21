import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkMiddleware } from "redux-thunk";
import nodesReducer, {
  checkNodeStatus,
  checkNodeBlocks,
  NodesState,
} from "../reducers/nodes";

describe("Store", () => {
  const nodes: NodesState = {
    list: [
      {
        url: "a.com",
        online: false,
        name: "",
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
      },
      {
        url: "b.com",
        online: false,
        name: "",
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
      },
      {
        url: "c.com",
        online: false,
        name: "",
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
      },
      {
        url: "d.com",
        online: false,
        name: "",
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
      },
    ],
  };

  let store: EnhancedStore<
    { nodes: NodesState },
    AnyAction,
    [
      | ThunkMiddleware<{ nodes: NodesState }, AnyAction, null>
      | ThunkMiddleware<{ nodes: NodesState }, AnyAction, undefined>
    ]
  >;

  beforeAll(() => {
    store = configureStore({
      reducer: {
        nodes: nodesReducer,
      },
      preloadedState: { nodes },
    });
  });
  afterAll(() => {});

  it("should display results when necessary data is provided", () => {
    const actions = [
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "alpha" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { node_name: "beta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "gamma" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[2] },
        payload: { node_name: "delta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { node_name: "epsilon" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "zeta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "eta" },
      },
      {
        type: checkNodeStatus.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { node_name: "theta" },
      },
    ];
    actions.forEach((action) => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        {
          url: "a.com",
          online: true,
          name: "theta",
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
        },
        {
          url: "b.com",
          online: true,
          name: "epsilon",
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
        },
        {
          url: "c.com",
          online: true,
          name: "delta",
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
        },
        {
          url: "d.com",
          online: false,
          name: "",
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
        },
      ],
    };

    expect(actual.nodes).toEqual(expected);
  });

  it("should display blocks when necessary data is provided", () => {
    const actions = [
      {
        type: checkNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { data: [] },
      },
      {
        type: checkNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[0] },
        payload: { data: [] },
      },
      {
        type: checkNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[2] },
        payload: { data: [] },
      },
      {
        type: checkNodeBlocks.fulfilled.type,
        meta: { arg: nodes.list[1] },
        payload: { data: [] },
      },
    ];
    actions.forEach((action) => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      list: [
        {
          url: "a.com",
          online: true,
          name: "theta",
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
        },
        {
          url: "b.com",
          online: true,
          name: "epsilon",
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
        },
        {
          url: "c.com",
          online: true,
          name: "delta",
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
        },
        {
          url: "d.com",
          online: false,
          name: "",
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
        },
      ],
    };

    expect(actual.nodes).toEqual(expected);
  });
});
