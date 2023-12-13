import xlsx from "json-as-xlsx";
import { coordinatorData } from "./data-action"

export function downloadLoadCoordAction() {
    let columns = [
        {
            sheet: "Coordinator's Actions",
            columns: [
                { label: "Coordinator", value: "operationCoordinator" },
                { label: "Team", value: "team"},
                {label: "Actions", value: "action"},
                {label: "Time", value: "createdAtTime"},
                {label: "Date", value: "createdAtDate"}
            ],
            content: coordinatorData,
        }
    ];

    let settings = {
        fileName: "Coordinator's Actions"
    };

    xlsx(columns, settings)
}