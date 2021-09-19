import { v4 } from "uuid";
import UtilityService from "../../utils/utils"
import { ARCHIVE_CHANNEL, GET_CHANNEL_DETAILS, GET_PINNED_MESSAGES, PIN_MESSAGE } from "../actions/types";

const initialState = {
  channelDetails: {},
  pinnedMessages: [],
};

const channelsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CHANNEL_DETAILS:
      return {
        ...state,
        channelDetails: { ...payload },
      };
    case GET_PINNED_MESSAGES: {
      return {
        ...state,
        pinnedMessages: payload
      };
    }
    case PIN_MESSAGE: {
      const { pinnedMessages: formal } = state;
      const pinnedMessages =  UtilityService.removeDuplicateObjectFromArray(
        [...formal, payload], 
        "_id"
      );
      return {
        ...state,
        pinnedMessages
      };
    }
    case ARCHIVE_CHANNEL: {
      return {
        ...state,
        channelDetails: { ...payload },
      };
    }

    default:
      return state;
  }
};

export default channelsReducer;
