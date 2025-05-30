import { create } from 'zustand';

interface ProdState {
    allProdList: {
        elements: any[];
        pageNumber: number;
        pageSize: number;
        totalCount: number;
        totalPage: number;
    };
    ProdAuthor: {
        name: (string | null)[];
        imageUrl: (string | null)[];
    };
    ProdSkill: {
        logoImageUrl: (string | null)[];
    };
    initAllProd: (list: any) => void;
}

const useProd = create<ProdState>((set) => ({
    // 기본 데이터
    allProdList: {
        elements: [],
        pageNumber: 0,
        pageSize: 0,
        totalCount: 0,
        totalPage: 0,
    },
    ProdAuthor: {
        name: [],
        imageUrl: [],
    },
    ProdSkill: {
        logoImageUrl: [],
    },

    // 데이터 세팅 함수
    initAllProd: (list) => {
        const author = list.elements.map((el: any) => el.author ?? {});
        const skills = list.elements.flatMap((el: any) =>
            Array.isArray(el.skills) ? el.skills : []
        );

        set({
            allProdList: {
                elements: list.elements,
                pageNumber: list.pageNumber ?? 0,
                pageSize: list.pageSize ?? 0,
                totalCount: list.totalCount ?? 0,
                totalPage: list.totalPage ?? 0,
            },
            ProdAuthor: {
                name: author.map((c: any) => c?.name ?? null),
                imageUrl: author.map((c: any) => c?.imageUrl ?? null),
            },
            ProdSkill: {
                logoImageUrl: skills.map((s: any) => s?.logoImageUrl ?? null),
            },
        });
    },
}));

export { useProd };
