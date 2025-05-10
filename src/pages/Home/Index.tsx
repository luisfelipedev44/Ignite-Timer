import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCoundownButton,
  StopCoundownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCycleForm } from "./components/NewCyclesForm";
import { Countdown } from "./components/Countdown";
import { z } from "zod";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

/*interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}*/


const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z
    .number()
    .min(1, "O ciclo precisa ser de no mínimo 1 minuto.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

/*interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrencyCycleFinished: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
}*/

//export const CycleContext = createContext({} as CyclesContextType);

export function Home() {
  const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)


  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
            <Countdown />
          </FormProvider>
        

        {activeCycle ? (
          <StopCoundownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCoundownButton>
        ) : (
          <StartCoundownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCoundownButton>
        )}
      </form>
    </HomeContainer>
  );
}
