const whiteKeys = document.querySelectorAll('.white-key');
const blackKeys = document.querySelectorAll('.black-key');

let isMouseDown = false;

// 마우스 버튼을 눌렀을 때
document.addEventListener('mousedown', () => {
    isMouseDown = true;
});

// 마우스 버튼을 떼었을 때
document.addEventListener('mouseup', () => {
    isMouseDown = false;
    // 모든 흰 건반의 opacity 복원
    resetWhiteKeyOpacity();
});

// 마우스 이동 이벤트 추가
document.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const target = document.elementFromPoint(event.clientX, event.clientY);
        if (target && (target.classList.contains('white-key') || target.classList.contains('black-key'))) {
            const sound = target.dataset.sound;
            playSound(sound);
            // 클릭된 건반의 opacity 줄이기 (흰 건반에만 적용)
            if (target.classList.contains('white-key')) {
                setKeyOpacity(target, 0.9); // 원하는 투명도 값으로 설정 (0.0 ~ 1.0)
            }
        }
    }
});

// 모든 건반에 클릭 이벤트 추가
const addKeyClickListener = (key) => {
    key.addEventListener('mousedown', () => {
        const sound = key.dataset.sound;
        playSound(sound); // 사운드 재생 함수 호출
        // 클릭된 건반의 opacity 줄이기 (흰 건반에만 적용)
        if (key.classList.contains('white-key')) {
            setKeyOpacity(key, 0.9); // 원하는 투명도 값으로 설정 (0.0 ~ 1.0)
        }
    });

    // 마우스가 건반에서 떠났을 때
    key.addEventListener('mouseleave', () => {
        if (key.classList.contains('white-key')) {
            key.style.opacity = 1; // 흰 건반의 opacity 원래대로 복원
        }
    });
};

whiteKeys.forEach(addKeyClickListener);
blackKeys.forEach(addKeyClickListener);

// 이미지 드래그 방지
whiteKeys.forEach(key => {
    key.addEventListener('dragstart', (event) => {
        event.preventDefault(); // 기본 드래그 동작 방지
    });
});

blackKeys.forEach(key => {
    key.addEventListener('dragstart', (event) => {
        event.preventDefault(); // 기본 드래그 동작 방지
    });
});

// 사운드 재생 함수
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

// 클릭된 건반의 opacity를 줄이는 함수
function setKeyOpacity(key, opacity) {
    key.style.opacity = opacity; // opacity 값 설정
}

// 모든 흰 건반의 opacity를 원래대로 돌리는 함수
function resetWhiteKeyOpacity() {
    whiteKeys.forEach(key => key.style.opacity = 1); // 흰 건반 opacity 복원
}
