
import { RecoilState, atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()


export const imageDescription: RecoilState<{show: any, data: []}> = atom({
    key: "imageDescription",
    default: {
        show: false,
        data: []
    },
});


export const directoryState = atom({
    key: 'directoryState',
    default: {
        baseDirectory: "",
        count: "1"
    },
    effects_UNSTABLE: [persistAtom],
})

export const userNameState = atom({
    key: 'userNameState',
    default: "",
    effects_UNSTABLE: [persistAtom],
})

export const DataInform: RecoilState<any> = atom({
    key: 'DataInform',
    default: {
        imageTop: "",
        xmlTop: "",
        docTop: "",
        imageDown: "",
        xmlDown: "",
        docDown: "",
    },
});

export const ShowStateXml: RecoilState<any> = atom({
    key: 'ShowStateXml',
    default: {},
});

export const AllRecordState: RecoilState<[]> = atom({
    key: 'AllRecordState',
    default: [],
});

export const LastIdSeenState = atom({
    key: 'LastIdSeenState',
    default: 1,
})

export const BaseDirectory: RecoilState<string> = atom({
    key: 'BaseDirectory',
    default: "",
});


export const DirectorySelectedState: RecoilState<string> = atom({
    key: 'DirectorySelectedState',
    default: "",
});

export const FilterState: RecoilState<{
    top?: boolean;
    down?: boolean;
    status: string;
  }> = atom({
    key: 'FilterState',
    default: {
        status: "",
      }
});


export const ImageTopFocusState: RecoilState<number> = atom({
    key: 'ImageTopFocusState',
    default: 0,
});

export const ImageDownFocusState: RecoilState<number> = atom({
    key: 'ImageDownFocusState',
    default: 0,
});






