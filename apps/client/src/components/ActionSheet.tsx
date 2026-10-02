import { useState } from "react";

//type imports
import type { NodeKind, NodeMetadata } from "./CreateWorkflow";

//ui component imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//sheet component imports
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

//select component imports
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { TradingMetadata } from "@/nodes/actions/Lighter";

interface ActionShape {
	id: NodeKind;
	title: string;
	description: string;
}

const SUPPORTED_ACTIONS: ActionShape[] = [
	{
		id: "hyperliquid",
		title: "HyperLiquid",
		description: "place a trade on hyper liquid",
	},
	{
		id: "lighter",
		title: "Lighter",
		description: "place a trade on lighter",
	},
	{
		id: "backpack",
		title: "BackPack",
		description: "Place a trade on backpack",
	},
];

const SUPPORTED_ASSETS = ["ETH", "BTC", "SOL", "USDC", "USDT"];

export const ActionSheet = ({
	onSelect,
}: {
	onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
	const [metadata, setMetadata] = useState<TradingMetadata | {}>({});
	const [selectedAction, setSelectedAction] = useState<NodeKind>(
		SUPPORTED_ACTIONS[0].id,
	);

	return (
		<Sheet defaultOpen={true}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Select Action</SheetTitle>
					<SheetDescription>
						select the type of the ACtion to be performed
						<Select
							value={selectedAction}
							onValueChange={(value) => {
								if (value !== null) setSelectedAction(value);
							}}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select an Action" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{SUPPORTED_ACTIONS.map(({ id, title }) => (
										<>
											<SelectItem key={id} value={id}>
												{title}
											</SelectItem>
											{/* <SelectLabel>{description}</SelectLabel> */}
										</>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						{/* timer selector */}
						{(selectedAction === "hyperliquid" ||
							selectedAction === "lighter" ||
							selectedAction === "backpack") && (
							<div>
								<div className="p-4 flex flex-col gap-2">Type:</div>
								<Select
									value={metadata?.type}
									onValueChange={(value) => {
										if (metadata !== null)
											setMetadata((metadata) => ({
												...metadata,
												type: value,
											}));
									}}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select an asset" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem key={"LONG"} value={"LONG"}>
												LONG
											</SelectItem>
											<SelectItem key={"SHORT"} value={"SHORT"}>
												SHORT
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<div className="p-4 flex flex-col gap-2">symbol:</div>
								<Select
									value={metadata?.symbol}
									onValueChange={(value) => {
										if (metadata !== null)
											setMetadata((metadata) => ({
												...metadata,
												symbol: value,
											}));
									}}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a symbol" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{SUPPORTED_ASSETS.map((value) => (
												<>
													<SelectItem key={value} value={value}>
														{value}
													</SelectItem>
												</>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<div className="p-4 flex flex-col gap-2">
									Quantity:
									<Input
										type="text"
										onChange={(e) => {
											setMetadata((md) => ({
												...md,
												qty: Number(e.target.value),
											}));
										}}></Input>
								</div>
							</div>
						)}
					</SheetDescription>
				</SheetHeader>
				<SheetFooter>
					<Button
						onClick={() => {
							onSelect(selectedAction, metadata);
						}}
						type="submit">
						Create Action
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default ActionSheet;
