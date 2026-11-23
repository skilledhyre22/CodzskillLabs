import { useState } from "react";
import type { UpdateTrainerrStatusRequest } from "..";

import { updateTrainerStatus } from "../../services/trainerService";
import { toast } from "react-toastify";
import { getEnumKeyValue } from "../../utilis/enumToArray";
import { TrainerApplicationStatus } from "../../enums/Enums";

interface Props {
  id: string;
  currentStatus: number;
  onUpdated: () => void;
}

const UpdateTrainerStatus = ({ id, currentStatus, onUpdated }: Props) => {
  const [status, setStatus] = useState(currentStatus);

  const updateStatus = async () => {
    const model: UpdateTrainerrStatusRequest = {
      status,
      id
    };

    const response = await updateTrainerStatus(id, model.status as any);

    if (response.isSuccess) {
      toast.success(response.message);
      onUpdated();
    } else {
      toast.error(response.problemDetails?.title);
    }
  };

  return (
    <div className="flex gap-3">
      <select
        value={status}
        onChange={(e) => setStatus(Number(e.target.value))}
        className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5"
      >
        {getEnumKeyValue(TrainerApplicationStatus).map((item) => (
          <option key={item.key} value={item.key}>
            {item.value as any}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={updateStatus}
        className="rounded-xl bg-purple-600 px-5 py-2.5 font-semibold text-white hover:bg-purple-700"
      >
        Update Status
      </button>
    </div>
  );
};

export default UpdateTrainerStatus;