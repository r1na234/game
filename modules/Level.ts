declare global {
    const Level: ReturnType<typeof LevelModule>;
}

export function register_level() {
    (_G as any).Level = LevelModule();
}

function LevelModule(){
    function init() { 
    }
    let _lvl: number;

    function set_level(val: number) {
        _lvl = val;
    }
    function get_level() {
        return _lvl;
    }

    init();
    return { set_level, get_level };
}