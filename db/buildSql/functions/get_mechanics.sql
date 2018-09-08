-- FUNCTION: public.get_mechanics(bigint)

-- DROP FUNCTION public.get_mechanics(bigint);

CREATE OR REPLACE FUNCTION public.get_mechanics(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(json_build_object(
	'id', mech.id,
	'conditionalText', CASE WHEN get_description(mech.id, 2908) IS NULL THEN '' ELSE get_description(mech.id, 2908) END,
	'specialText', CASE WHEN get_description(mech.id, 2933) IS NULL THEN '' ELSE get_description(mech.id, 2933) END,
	'target', get_mechanic_target(mech."targetId"),
	'type', get_item_with_type(mech."typeId"),
	'bonus', json_build_object(
		'abilityScore', CASE WHEN bonus."typeId" = 2913 THEN get_item(bonus."abilityScoreId") ELSE null END,
		'advancement', json_build_object(
			'atLevels', get_at_levels_list(mech.id),
			'levelCount', bonus."advancementValue",
			'type', get_item(bonus."advancementTypeId")
		),
		'dice', get_dice(bonus."diceId"),
		'type', get_item(bonus."typeId"),
		'value', bonus."value"
	)
))
FROM adm_core_mechanic mech
INNER JOIN adm_link lnk ON lnk."targetId" = mech."id"
LEFT OUTER JOIN adm_def_mechanic_bonus bonus ON bonus."mechanicId" = mech."id"
WHERE lnk."referenceId" = $1

$BODY$;

ALTER FUNCTION public.get_mechanics(bigint)
    OWNER TO postgres;
