import {
  selectFormData,
  updateForm,
} from "../../../../features/Form/FormSlice.tsx";
import { useAppDispatch } from "../../../../hooks/useAppDispatch.ts";
import { useAppSelector } from "../../../../hooks/useAppSelector.ts";
import { TimeFrameType } from "../../../../types.ts";
import "./timeframe.toggle.styles.css";

const TimeFrameToogler = () => {
  const { timeFrame }: TimeFrameType = useAppSelector(selectFormData);
  const dispatch = useAppDispatch();

  return (
    <div className="toggle">
      <p>Monthly</p>
      <label htmlFor="timeframe__toggle" className={"timeframe__toggle"}>
        <input
          type="checkbox"
          id={"timeframe__toggle"}
          checked={timeFrame === "yearly"}
          onChange={() =>
            dispatch(
              updateForm({
                fieldToUpdate: {
                  timeFrame: timeFrame === "yearly" ? "monthly" : "yearly",
                },
              })
            )
          }
        />
        <span className={"timeframe__toggle-slider"}></span>
      </label>
      <p>Yearly</p>
    </div>
  );
};

export default TimeFrameToogler;
