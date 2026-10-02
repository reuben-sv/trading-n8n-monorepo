import { Handle, Position } from "@xyflow/react";
import { type TradingMetadata } from "common/types";

export function Backpack({
	data,
	inconnectable,
}: {
	data: { metadata: TradingMetadata };
	inconnectable: boolean;
}) {
	return (
		<div className="workflow-node workflow-node-action workflow-node-backpack">
			<span className="workflow-node-label">Backpack trade</span>
			<div className="workflow-node-value">{data.metadata.type}</div>
			<div className="workflow-node-detail">
				{data.metadata.qty} {data.metadata.symbol}
			</div>
			<Handle type="target" position={Position.Left}></Handle>
			<Handle type="source" position={Position.Right}></Handle>
		</div>
	);
}
