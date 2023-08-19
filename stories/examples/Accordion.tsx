import React from 'react';
import type { SampleStory } from './utils/util';
import { Accordion, TextInput } from '../../src';

// the name of this function should be the name of the story in the docs
export const BasicAccordion: SampleStory = (args) => (
    <Accordion {...args}>
        Eu reprehenderit nisi nostrud. Dolore exercitation proident ipsum ad pariatur ex
        exercitation aliqua dolore ex laborum adipisicing duis. Cupidatat commodo do consequat minim
        eiusmod est laboris consequat aliqua minim anim eu commodo. Fugiat nisi pariatur proident
        minim culpa esse exercitation. Sit culpa deserunt amet ullamco laborum. Laborum velit ex
        consequat eiusmod officia ut. Pariatur consequat incididunt anim fugiat ut proident mollit
        sit. Laborum do non labore dolor sunt veniam mollit voluptate irure veniam pariatur eiusmod
        consectetur. Quis sunt in amet amet deserunt voluptate qui nisi. Deserunt anim occaecat
        ullamco dolor voluptate esse laboris aute esse sunt ullamco. Ex commodo sunt in labore est
        magna mollit aliqua deserunt. Velit laboris laboris cupidatat enim esse ipsum magna irure ea
        ullamco deserunt. Ex id et mollit eiusmod anim deserunt eiusmod eiusmod culpa eiusmod. Ad ex
        duis deserunt enim sunt culpa cillum aliquip elit aliqua. Sit labore officia minim dolor
        laborum exercitation ut amet in fugiat reprehenderit. Pariatur ut elit consectetur sit.
        Dolor esse duis dolore duis duis nisi. Do magna veniam minim laborum et fugiat cupidatat
        enim magna. Non in adipisicing quis aute exercitation ut aliqua anim ipsum ad et laborum
        laborum quis. Exercitation amet excepteur dolore id anim minim enim. Dolor sit mollit
        deserunt elit consectetur velit consectetur nulla adipisicing culpa tempor labore enim. Eu
        ad consectetur deserunt elit. Aliquip ut sit in quis sint in nulla laboris nisi eiusmod
        consectetur dolore eiusmod. Fugiat culpa dolor consectetur adipisicing occaecat aliquip
        aliqua do id id minim id proident do minim. Occaecat ex reprehenderit aliquip commodo.
        Ullamco sit tempor commodo amet sunt sint est ex eu quis nulla. Est deserunt fugiat
        adipisicing deserunt quis Lorem nostrud ut laborum. Magna excepteur cupidatat occaecat.
        Culpa dolore nisi cupidatat occaecat consectetur nostrud adipisicing Lorem pariatur ad ipsum
        cupidatat. Eu dolore ea exercitation. Aliquip officia aliqua aliqua dolor magna velit
        cupidatat reprehenderit dolor exercitation nisi minim. Ut Lorem culpa nulla velit cupidatat
        esse. Irure sit consequat Lorem. Magna nulla ex do. Aute commodo tempor culpa cupidatat
        veniam aliqua non sunt anim. Duis in id duis laborum eiusmod eiusmod cupidatat cupidatat
        laboris nulla laboris ipsum. Elit consectetur consectetur commodo proident ullamco pariatur
        nulla velit laboris ullamco tempor. Proident occaecat ullamco veniam exercitation ex do. In
        nisi aliquip elit officia laboris. Minim anim magna consectetur officia officia exercitation
        mollit duis commodo sit officia minim. Exercitation officia ullamco deserunt consectetur
        commodo aute aliqua labore. Laborum excepteur culpa enim consectetur pariatur irure in eu ea
        adipisicing aliquip sit ad. Dolor consequat reprehenderit ut eiusmod culpa laboris
        reprehenderit nulla ea culpa fugiat id velit est. Magna labore velit exercitation irure esse
        laboris aute nisi. Laborum incididunt laboris sit aute. Ea amet ea proident in deserunt elit
        ad pariatur culpa ea et id dolor dolor. Ut laboris dolor ea Lorem nulla reprehenderit culpa
        esse ullamco dolor. Officia amet commodo sunt. Velit quis tempor qui eiusmod dolore nostrud
        velit nisi. Laborum ullamco in commodo dolore duis adipisicing cupidatat cupidatat ipsum
        culpa mollit voluptate deserunt. Dolor culpa veniam Lorem labore eu magna sunt esse ipsum
        labore sunt. Exercitation deserunt fugiat amet enim adipisicing. Anim anim qui Lorem
        exercitation eiusmod. Do laborum laboris sit minim deserunt aliqua nisi et elit ex eiusmod
        velit proident ipsum. Amet tempor excepteur laboris elit occaecat nulla. Voluptate in
        nostrud enim aute dolore irure nostrud do eu consectetur quis. Eiusmod Lorem ut
        reprehenderit in nostrud fugiat ea nisi id aliqua do. Eu ullamco laboris adipisicing laboris
        veniam tempor laborum dolore voluptate anim veniam amet ex ipsum. Consectetur labore esse
        magna nulla proident.
    </Accordion>
);

export const AccordionMenu: SampleStory = (args) => (
    <>
        <Accordion id="option-1" header="Option 1">
            Content of option 1
        </Accordion>
        <Accordion id="option-2" header="Option 2">
            Content of option 2
        </Accordion>
        <Accordion id="option-3" header="Option 3">
            Content of option 3
        </Accordion>
    </>
);

export const ControlledAccordionMenu: SampleStory = (args) => {
    const [open, setOpen] = React.useState<string | null>(null);

    return (
        <>
            <Accordion
                id="option-1"
                header="Option 1"
                override={open === 'option-1'}
                onClick={() => setOpen('option-1')}
            >
                Content of option 1
            </Accordion>
            <Accordion
                id="option-2"
                header="Option 2"
                override={open === 'option-2'}
                onClick={() => setOpen('option-2')}
            >
                Content of option 2
            </Accordion>
            <Accordion
                id="option-3"
                header="Option 3"
                override={open === 'option-3'}
                onClick={() => setOpen('option-3')}
            >
                Content of option 3
            </Accordion>
        </>
    );
};
