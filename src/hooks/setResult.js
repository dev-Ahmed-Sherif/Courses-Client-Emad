import { postServerData } from "../helper/helper";
import * as Action from "../redux/user_reducer";

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};
export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};

/** insert user data */
export const usePublishResult = (resultData) => {
  const { result, _id } = resultData;
  (async () => {
    try {
      if (result !== [] && !_id) throw new Error("Couldn't get Result");
      await postServerData(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/users/update-user-result`,
        resultData,
        (data) => data
      );
    } catch (error) {
      console.log(error);
    }
  })();
};
