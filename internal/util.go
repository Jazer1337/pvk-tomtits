package internal

type Set map[int]struct{}

func (s *Set) Add(element int) {
	(*s)[element] = struct{}{}
}

func (s *Set) Remove(element int) {
	delete(*s, element)
}

func (s *Set) Contains(element int) bool {
	_, exists := (*s)[element]
	return exists
}
