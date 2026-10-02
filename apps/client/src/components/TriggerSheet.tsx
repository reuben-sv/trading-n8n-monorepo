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

import {
	type PriceTriggerMetadata,
	type TimerNodeMetadata,
} from "common/types";

interface TriggerShape {
	id: NodeKind;
	title: string;
	description: string;
}

const SUPPORTED_TRIGGERS: TriggerShape[] = [
	{ id: "timer", title: "Timer", description: "run this every x sec or min" },
	{
		id: "price-trigger",
		title: "Price Trigger",
		description: "run when price is above or below a certain threshold",
	},
];

export const TriggerSheet = ({
	onSelect,
}: {
	onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
	const [metadata, setMetadata] = useState<
		PriceTriggerMetadata | TimerNodeMetadata
	>({
		time: 3600,
	});
	const [selectedTrigger, setSelectedTrigger] = useState<NodeKind>(
		SUPPORTED_TRIGGERS[0].id,
	);

	return (
		<Sheet defaultOpen={true}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Select Trigger</SheetTitle>
					<SheetDescription>
						select the type of the trigger needed
						<Select
							value={selectedTrigger}
							onValueChange={(value) => {
								if (value !== null) setSelectedTrigger(value);
							}}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select an trigger" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{SUPPORTED_TRIGGERS.map(({ id, title }) => (
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
						{selectedTrigger === "timer" && (
							<div className="p-4 flex flex-col gap-2">
								Timer (in seconds):
								<Input
									type="text"
									onChange={(e) => {
										setMetadata((md) => ({
											...md,
											time: Number(e.target.value),
										}));
									}}></Input>
							</div>
						)}
						{/* price trigger selector */}
						{selectedTrigger === "price-trigger" && (
							<div className="p-4 flex flex-col gap-2">
								Price:
								<Input
									type="text"
									onChange={(e) =>
										setMetadata((md) => ({
											...md,
											price: Number(e.target.value),
										}))
									}></Input>
								Asset:
								<Select
									value={metadata.asset}
									onValueChange={(value) => {
										if (metadata !== null)
											setMetadata((metadata) => ({
												...metadata,
												asset: value,
											}));
									}}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select an asset" />
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
							</div>
						)}
					</SheetDescription>
				</SheetHeader>
				<SheetFooter>
					<Button
						onClick={() => {
							onSelect(selectedTrigger, metadata);
						}}
						type="submit">
						Create Trigger
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default TriggerSheet;
