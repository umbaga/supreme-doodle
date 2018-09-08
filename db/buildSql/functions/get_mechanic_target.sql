-- FUNCTION: public.get_mechanic_target(bigint)

-- DROP FUNCTION public.get_mechanic_target(bigint);

CREATE OR REPLACE FUNCTION public.get_mechanic_target(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_build_object(
	'id', i.id,
	'name', i."itemName",
	'type', get_type(i."typeId"),
	'abilityScore', get_item(abscor."abilityScoreId"),
	'category', get_item(prof."categoryId")
)
FROM adm_core_item i
LEFT OUTER JOIN adm_def_proficiency prof ON prof."proficiencyId" = i.id
LEFT OUTER JOIN adm_def_proficiency_ability_score abscor ON abscor."proficiencyId" = i.id
WHERE i.id = $1

$BODY$;

ALTER FUNCTION public.get_mechanic_target(bigint)
    OWNER TO postgres;
